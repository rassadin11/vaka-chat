import { Button } from '../../components/Button/Button';
import './StartPage.scss';

export default function StartPage(): JSX.Element {

    return (
        <div className="empty-page">
            <div className="empty-page__content">
                <div className="empty-page__icon-wrap">
                    <svg className="empty-page__icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <div className="empty-page__glow" />
                </div>

                <h1 className="empty-page__title">Нет активного чата</h1>
                <p className="empty-page__subtitle">
                    Создайте новый чат, чтобы начать общение с нейросетью
                </p>

                <Button title="Новый чат" />
            </div>
        </div>
    );
}