import { useState } from 'react';
import { useApp } from '../context/AppContext';

const questions = [
  {
    emoji: '🏠',
    title: 'Where are you living?',
    subtitle: 'This directly affects how we split your budget.',
    options: [
      { emoji: '🏨', label: 'Hostel / PG', value: 'hostel' },
      { emoji: '👨‍👩‍👦', label: 'With parents', value: 'parents' },
      { emoji: '🏢', label: 'Independent flat', value: 'independent' },
    ],
  },
  {
    emoji: '🎉',
    title: 'Is this your first-ever salary?',
    subtitle: 'We celebrate Day One differently.',
    options: [
      { emoji: '🌟', label: 'Yes, first job ever!', value: 'first' },
      { emoji: '🔄', label: 'Switched jobs', value: 'switched' },
    ],
  },
  null, // salary input step — handled inline
  {
    emoji: '📋',
    title: 'Any existing loans or EMIs?',
    subtitle: 'This determines your available margin.',
    options: [
      { emoji: '🆓', label: 'None — completely free', value: 'none' },
      { emoji: '📝', label: 'Yes, I have EMIs', value: 'has-loans' },
    ],
  },
];

export default function QuizScreen() {
  const { navigate, addScore, dispatch } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [salaryVal, setSalaryVal] = useState('₹45,000');

  const handleOption = (value) => {
    setAnswers(prev => ({ ...prev, [step]: value }));
    setTimeout(() => {
      if (step < 3) {
        setStep(step + 1 === 2 ? 2 : step + 1); // step 2 is salary input
      } else {
        setShowResult(true);
      }
    }, 400);
  };

  const handleSalaryNext = () => {
    const num = parseInt(salaryVal.replace(/[^\d]/g, ''));
    if (num > 0) dispatch({ type: 'SET_SALARY', salary: num });
    setStep(3);
  };

  const handleFinish = () => {
    // Store quiz answers in context
    Object.entries(answers).forEach(([s, v]) => {
      dispatch({ type: 'SET_QUIZ_ANSWER', step: s, value: v });
    });
    addScore(10);
    navigate('dashboard');
  };

  if (showResult) {
    return (
      <section className="screen">
        <div className="quiz-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="quiz-result show">
            <div className="quiz-result-icon">🧭</div>
            <h2>Got it, Rahul!</h2>
            <p>
              You&apos;re a <strong>hosteller</strong> earning <strong>₹45,000</strong> with{' '}
              <strong>zero obligations</strong>.
            </p>
            <p className="text-secondary">
              Here&apos;s your Day One plan — calibrated to you, not a template.
            </p>
            <button className="btn btn-accent" onClick={handleFinish}>
              See my Dashboard →
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="screen">
      <div className="quiz-container">
        {/* Progress */}
        <div className="quiz-progress-bar">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`qp-segment ${i < step ? 'filled' : ''}`} />
          ))}
        </div>

        {/* Step 2: Salary input */}
        {step === 2 ? (
          <div className="quiz-step active">
            <div className="quiz-emoji">💰</div>
            <h2>Monthly salary?</h2>
            <p className="quiz-subtitle">We&apos;ll use this to calibrate your budget.</p>
            <div className="input-group" style={{ marginBottom: 'var(--space-lg)' }}>
              <label>Monthly in-hand salary</label>
              <input
                type="text"
                value={salaryVal}
                onChange={e => setSalaryVal(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSalaryNext}>Continue</button>
          </div>
        ) : (
          /* Option-based steps */
          questions[step] && (
            <div className="quiz-step active" key={step}>
              <div className="quiz-emoji">{questions[step].emoji}</div>
              <h2>{questions[step].title}</h2>
              <p className="quiz-subtitle">{questions[step].subtitle}</p>
              <div className="quiz-options">
                {questions[step].options.map(opt => (
                  <div
                    key={opt.value}
                    className={`quiz-option ${answers[step] === opt.value ? 'selected' : ''}`}
                    onClick={() => handleOption(opt.value)}
                  >
                    <span className="option-emoji">{opt.emoji}</span> {opt.label}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
