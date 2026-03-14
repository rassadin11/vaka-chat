import { useEffect, useState } from 'react';
import "./ThemeToggle.scss";

export default function ThemeToggle(): JSX.Element {
    const [isDark, setIsDark] = useState(
        () => (localStorage.getItem('theme') || 'dark') === 'dark'
    );

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDark]);

    function toggle() {
        document.documentElement.classList.add('theme-transitioning');
        setIsDark(v => !v);
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    }

    return (
        <button
            className="theme-toggle"
            onClick={toggle}
            title={isDark ? 'Светлая тема' : 'Тёмная тема'}
        >
            {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}