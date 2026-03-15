import { getRate } from '../constants/constants.js';
import { prisma } from '../prisma.js';

export async function getNextMessageOrder(chatId) {
    const last = await prisma.message.findFirst({
        where: { chatId },
        orderBy: { order: 'desc' },
        select: { order: true },
    });
    return (last?.order ?? -1) + 1;
}

function estimateTokens(text) {
    return Math.ceil(text.length / 3);
}

export async function saveAssistantMessage({ chatId, userId, accumulated, usage, model, modelName, messagesForAI, aborted, price, userMessage }) {
    if (!accumulated) return;
    let cost = usage?.cost;

    let inputTokens = usage?.prompt_tokens ?? null;
    let outputTokens = usage?.completion_tokens ?? null;

    if (!cost) {
        const inputText = messagesForAI
            .map(m => typeof m.content === 'string' ? m.content : JSON.stringify(m.content))
            .join(' ');

        inputTokens = estimateTokens(inputText);
        outputTokens = estimateTokens(accumulated);

        cost = inputTokens * price.income + outputTokens * price.outcome
    }

    try {
        const assistantOrder = await getNextMessageOrder(chatId);
        const costUSD = cost ?? 0;
        const rateWithMarkup = getRate();
        const costRub = costUSD * rateWithMarkup;

        const [createdUserMessage, , updatedUser] = await prisma.$transaction([
            prisma.message.create({
                data: userMessage
            }),
            prisma.message.create({
                data: {
                    chatId,
                    role: 'assistant',
                    content: accumulated,
                    cost: costUSD,
                    rubPrice: costRub,
                    model,
                    modelName,
                    inputTokens,
                    outputTokens,
                    order: assistantOrder,
                },
            }),
            prisma.user.update({
                where: { id: userId },
                data: {
                    balanceUSD: { decrement: costUSD },
                    balance: { decrement: costRub },
                    amountOfQueries: { increment: 1 },
                },
                select: { balance: true, balanceUSD: true },
            }),
        ]);

        return {
            balance: updatedUser.balance, balanceUSD: updatedUser.balanceUSD,
            userMessageId: createdUserMessage.id,
        };
    } catch (err) {
        console.error('[saveAssistantMessage] Failed:', err);
    }
}