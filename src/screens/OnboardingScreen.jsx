import { useState } from 'react';
import { useApp } from '../context/AppContext';

const slides = [
  {
    icon: '📊', bg: 'green',
    title: <>No credit history?<br/>That&apos;s the point.</>,
    text: "You're not behind. You're at the starting line. Day One builds your credit story from your very first salary.",
  },
  {
    icon: '⚡', bg: 'blue',
    title: <>Every action<br/>builds your score.</>,
    text: 'Budget, save, invest — each step adds to your Credit Story. Watch it grow in real-time.',
  },
  {
    icon: '🔓', bg: 'gold',
    title: <>Doors open<br/>as you grow.</>,
    text: 'Credit card at month 6. Personal loan at month 12. No other bank rewards you for starting from zero.',
  },
];

export default function OnboardingScreen() {
  const { navigate } = useApp();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < 2) setCurrent(current + 1);
    else navigate('account-type');
  };

  return (
    <section className="screen no-pad">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: 'var(--space-lg)' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <div className="onboarding-slides">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`onboarding-slide ${i === current ? 'active' : i < current ? 'exit' : ''}`}
              >
                <div className={`onboarding-icon ${slide.bg}`}>{slide.icon}</div>
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dots">
          {slides.map((_, i) => (
            <div key={i} className={`dot ${i === current ? 'active' : ''}`} />
          ))}
        </div>

        <div className="onboarding-footer">
          <button className="btn btn-accent" onClick={handleNext}>
            {current === 2 ? 'Start My Story →' : 'Next'}
          </button>
        </div>
      </div>
    </section>
  );
}
