import { useNavigate } from "react-router";
import { useChatStore } from "../../store/chatStore";
import { chatApi } from "../../api/chats";
import { FORMAT_PROMPT } from "../../utils/system-settings";

interface IButton {
    title: string,
}

export const Button = ({ title }: IButton) => {
    const navigate = useNavigate();
    const { chats, setChats } = useChatStore();

    const handleCreateChat = async () => {
        await chatApi.newChat({
            title: 'Новый чат',
            systemPrompt: FORMAT_PROMPT,
        }).then(chat => {
            setChats([...chats, { ...chat, messages: [] }]);
            navigate(`/chats/${chat.id}`);
        });
    };

    return (
        <button className="empty-page__btn" onClick={handleCreateChat}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {title}
        </button>
    )
}