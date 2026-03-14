import { useEffect, useRef, useState } from 'react'
import "./Dropdown.scss"
import { useChatStore } from '../../store/chatStore';

function Dropdown() {
    const { contextLimit, setContextLimit } = useChatStore(s => s)
    const [isContextOpen, setIsContextOpen] = useState(false);
    const contextRef = useRef<HTMLDivElement>(null);

    const CONTEXT_OPTIONS = [
        { value: 5, label: '5 сообщений' },
        { value: 10, label: '10 сообщений' },
        { value: 25, label: '25 сообщений' },
        { value: 0, label: 'Не ограничено' },
    ];

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (contextRef.current && !contextRef.current.contains(e.target as Node)) {
                setIsContextOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="dropdown__context" ref={contextRef}>
            <button
                type="button"
                className="dropdown__context-trigger"
                onClick={() => setIsContextOpen((p) => !p)}
                title="Глубина контекста"
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{contextLimit ? `${contextLimit} сообщ.` : '∞'}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: isContextOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {isContextOpen && (
                <div className="dropdown__context-dropdown">
                    {CONTEXT_OPTIONS.map((opt) => (
                        <div
                            key={opt.value ?? 'unlimited'}
                            className={`dropdown__context-option ${contextLimit === opt.value ? 'dropdown__context-option--active' : ''}`}
                            onClick={() => { setContextLimit(opt.value); setIsContextOpen(false); }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown