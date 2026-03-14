import { useChatStore } from '../../store/chatStore';
import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';
import './ChatArea.scss';

export default function ChatArea() {
  const { activeChat } = useChatStore(s => s);
  const changeChatTitle = useChatStore(s => s.changeChatTitle);
  const sidebarOpen = useChatStore((s) => s.sidebarOpen);
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);

  const handleTitleChange = (e: React.FocusEvent<HTMLParagraphElement>) => {
    const newTitle = e.currentTarget.textContent?.trim() || 'Новый чат';
    if (activeChat && newTitle !== activeChat.title) {
      changeChatTitle(activeChat.id, newTitle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-area__title">
        {!sidebarOpen && (
          <button className="sidebar-open-btn in-chat" onClick={toggleSidebar}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        )}
        <div className='name'>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={handleTitleChange}
            onKeyDown={handleKeyDown}
          >
            {activeChat?.title}
          </p>
          <span>Нажмите, чтобы изменить название</span>
        </div>
      </div>
      {activeChat ? <MessageList messages={activeChat.messages} /> :
        <div className="app__empty">
          <div className="app__empty-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Напишите и отправьте текст, чтобы создать новый чат</p>
          </div>
        </div>
      }
      <MessageInput />
    </div>
  );
}
