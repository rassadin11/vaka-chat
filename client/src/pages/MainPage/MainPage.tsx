import { useEffect } from "react";
import ChatArea from "../../components/ChatArea/ChatArea";
import { useChatStore } from "../../store/chatStore";
import { useNavigate, useParams } from "react-router";

export const MainPage = () => {
    const { chatId } = useParams()
    const setActiveChat = useChatStore(s => s.setActiveChat)
    const navigate = useNavigate()

    useEffect(() => {
        if (chatId) {
            setActiveChat(chatId).then(res => {
                if (!res) navigate('/chats/not-found')
            })
        }
    }, [chatId])

    return (
        <main className="app__main">
            <ChatArea />
        </main>
    );
}