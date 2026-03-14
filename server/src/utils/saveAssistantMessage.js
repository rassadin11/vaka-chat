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

export async function saveAssistantMessage({ chatId, accumulated, usage, model, modelName, messagesForAI, aborted, price }) {
    if (!accumulated) return;

    let inputTokens = usage?.prompt_tokens ?? null;
    let outputTokens = usage?.completion_tokens ?? null;

    if (aborted && !usage) {
        const inputText = messagesForAI
            .map(m => typeof m.content === 'string' ? m.content : JSON.stringify(m.content))
            .join(' ');

        inputTokens = estimateTokens(inputText);
        outputTokens = estimateTokens(accumulated);
    }

    try {
        const assistantOrder = await getNextMessageOrder(chatId);
        await prisma.message.create({
            data: {
                chatId,
                role: 'assistant',
                content: accumulated,
                cost: price.income * inputTokens + price.outcome * outputTokens,
                model,
                modelName,
                inputTokens,
                outputTokens,
                order: assistantOrder,
            },
        });
    } catch (err) {
        console.error('[saveAssistantMessage] Failed:', err);
    }
}