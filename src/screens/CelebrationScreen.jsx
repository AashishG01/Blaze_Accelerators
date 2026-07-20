import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export default function CelebrationScreen() {
  const { navigate, salary, addScore, fireConfetti } = useApp();
  const amountRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Fire confetti
    setTimeout(fireConfetti, 300);

    // Animate counter
    const el = amountRef.current;
    if (!el) return;

    const duration = 2000;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * salary);
      el.textContent = '₹' + current.toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
    }

    setTimeout(() => requestAnimationFrame(tick), 500);

    // Add credit score after counter finishes
    setTimeout(() => addScore(10), 1500);
  }, [salary, addScore, fireConfetti]);

  return (
    <section className="screen center celebration">
      <div className="celebration-content">
        <div className="celebration-emoji">🎉</div>
        <div className="celebration-amount" ref={amountRef}>₹0</div>
        <h2>Your first salary just landed!</h2>
        <p className="celebration-sub">This is a big deal. Let&apos;s make every rupee count.</p>

        <div className="card card-credit-story credit-update-card">
          <div className="cu-row">
            <span className="cu-check">✅</span>
            <span className="cu-text">First salary received</span>
            <span className="cu-points">+10 Credit Story</span>
          </div>
        </div>

        <button
          className="btn btn-accent"
          style={{ marginTop: 'var(--space-lg)' }}
          onClick={() => navigate('budget')}
        >
          Let&apos;s put this salary to work →
        </button>
      </div>
    </section>
  );
}
