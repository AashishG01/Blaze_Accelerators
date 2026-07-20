import { useApp } from '../context/AppContext';

export default function ScoreToast() {
  const { toastText, toastVisible } = useApp();

  return (
    <div className={`score-toast ${toastVisible ? 'show' : ''}`}>
      <span className="toast-icon">⚡</span>
      <span>{toastText}</span>
    </div>
  );
}
