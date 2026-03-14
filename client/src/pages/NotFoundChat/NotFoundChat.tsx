import { Button } from '../../components/Button/Button';
import styles from './NotFoundChat.module.scss';

function NotFoundChat() {
    return (
        <div className={styles.wrap}>
            <div className={styles.code}>404</div>

            <div className={styles.iconWrap}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>

            <h1 className={styles.title}>Чат не найден</h1>
            <p className={styles.subtitle}>Этот чат был удалён или вам закрыт доступ к нему</p>

            <Button title="Создать новый чат" />
        </div>
    );
}

export default NotFoundChat;