import './Loading.scss';

export default function Loading() {
    return (
        <div className="loader">
            <span className="loader__dot" />
            <span className="loader__dot" />
            <span className="loader__dot" />
        </div>
    );
}