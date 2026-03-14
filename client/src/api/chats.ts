import { Chat } from "../types";
import { client } from "./client";

interface ChatProps {
    title: string;
    systemPrompt: string;
}

export interface ChatResponse {
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    systemPrompt: string | null;
    deletedAt: Date | null;
}

export interface MessageResponse {
    id: string;
    chatId: string;
    role: string;
    content: string;
    model: string | null;
    inputTokens: number | null;
    outputTokens: number | null;
    cost: number | null;
    createdAt: Date;
    order: number;
}

export const chatApi = {
    newChat: (data: ChatProps) => client.post<ChatResponse>("/chats", data),
    getChats: () => client.get<ChatResponse[]>("/chats"),
    getChat: (chatId: string) => client.get<Chat>(`/chats/${chatId}`),
    removeChat: (chatId: string) => client.delete(`/chats/${chatId}`),
    updateChatTitle: (chatId: string, title: string) => client.patch(`/chats/${chatId}/title`, { title }),
    changeContextMessage: (chatId: string, messageId: string, userId: string) => client.patch(`/chats/${chatId}/messages/delete-context/${messageId}`, { userId }),
};