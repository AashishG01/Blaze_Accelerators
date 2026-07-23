import { useState } from 'react';
import { useApp } from '../context/AppContext';
import learningData from '../data/learningData';

export default function ModuleScreen() {
  const {
    navigate, dispatch, addScore, fireConfetti,
    currentModuleId, currentModuleStep, completedModules,
  } = useApp();

  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Find current module from data
  let currentModule = null;
  for (const world of learningData) {
    const found = world.modules.find(m => m.id === currentModuleId);
    if (found) { currentModule = found; break; }
  }

  if (!currentModule) {
    return (
      <section className="screen">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤔</div>
          <h2>No module selected</h2>
          <button className="btn btn-primary" onClick={() => navigate('learn')} style={{ marginTop: '24px' }}>
            Back to Academy
          </button>
        </div>
      </section>
    );
  }

  const totalSlides = currentModule.slides.length;
  // Steps: 0 = intro, 1..N = slides, N+1 = quiz, N+2 = completion
  const quizStep = totalSlides + 1;
  const completionStep = totalSlides + 2;
  const step = currentModuleStep;

  const handleNext = () => {
    dispatch({ type: 'NEXT_MODULE_STEP' });
  };

  const handleQuizSelect = (index) => {
    if (quizSubmitted) return;
    setSelectedOption(index);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    setAttempts(prev => prev + 1);

    const isCorrect = selectedOption === currentModule.quiz.correctIndex;

    if (isCorrect) {
      // Calculate stars
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;

      // Delay then move to completion
      setTimeout(() => {
        dispatch({
          type: 'COMPLETE_MODULE',
          moduleId: currentModule.id,
          stars,
          xpReward: currentModule.xpReward,
        });
        addScore(currentModule.creditStoryBonus);
        fireConfetti();
        dispatch({ type: 'NEXT_MODULE_STEP' });
      }, 1200);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
  };

  const isCorrectAnswer = quizSubmitted && selectedOption === currentModule.quiz.correctIndex;
  const isWrongAnswer = quizSubmitted && selectedOption !== currentModule.quiz.correctIndex;

  // ─── Intro Screen ───
  if (step === 0) {
    return (
      <section className="screen module-screen">
        <button className="module-back" onClick={() => navigate('learn')}>
          ← Back
        </button>
        <div className="module-intro">
          <div className="module-intro-emoji">{currentModule.emoji}</div>
          <h2 className="module-intro-title">{currentModule.title}</h2>
          <div className="module-intro-meta">
            <span className="module-meta-item">📖 {totalSlides} slides</span>
            <span className="module-meta-item">❓ 1 quiz</span>
            <span className="module-meta-item">⚡ {currentModule.xpReward} XP</span>
          </div>
          <div className="module-intro-learn">
            <div className="module-intro-learn-title">What you'll learn</div>
            <ul className="module-intro-topics">
              {currentModule.slides.map((slide, i) => (
                <li key={i}>{slide.title}</li>
              ))}
            </ul>
          </div>
          <button className="btn btn-accent module-start-btn" onClick={handleNext}>
            Start Lesson →
          </button>
        </div>
      </section>
    );
  }

  // ─── Content Slides ───
  if (step >= 1 && step <= totalSlides) {
    const slideIdx = step - 1;
    const slide = currentModule.slides[slideIdx];

    return (
      <section className="screen module-screen">
        <button className="module-back" onClick={() => navigate('learn')}>
          ← Back
        </button>

        {/* Progress Dots */}
        <div className="module-progress-dots">
          {currentModule.slides.map((_, i) => (
            <div key={i} className={`module-dot ${i < slideIdx ? 'done' : ''} ${i === slideIdx ? 'active' : ''}`} />
          ))}
          <div className="module-dot quiz-dot">?</div>
        </div>

        <div className="module-slide">
          <div className="module-slide-emoji">{slide.emoji}</div>
          <h3 className="module-slide-title">{slide.title}</h3>
          <p className="module-slide-content">{slide.content}</p>
        </div>

        <div className="module-slide-footer">
          <div className="module-slide-counter">{slideIdx + 1} of {totalSlides}</div>
          <button className="btn btn-primary module-next-btn" onClick={handleNext}>
            {slideIdx < totalSlides - 1 ? 'Next →' : 'Take Quiz →'}
          </button>
        </div>
      </section>
    );
  }

  // ─── Quiz Screen ───
  if (step === quizStep) {
    return (
      <section className="screen module-screen">
        <button className="module-back" onClick={() => navigate('learn')}>
          ← Back
        </button>

        {/* Progress Dots */}
        <div className="module-progress-dots">
          {currentModule.slides.map((_, i) => (
            <div key={i} className="module-dot done" />
          ))}
          <div className="module-dot active quiz-dot">?</div>
        </div>

        <div className="module-quiz">
          <div className="module-quiz-header">
            <span className="module-quiz-icon">🧠</span>
            <span className="module-quiz-label">Quick Check</span>
          </div>
          <h3 className="module-quiz-question">{currentModule.quiz.question}</h3>

          <div className="module-quiz-options">
            {currentModule.quiz.options.map((option, idx) => {
              let optionClass = 'module-quiz-option';
              if (selectedOption === idx && !quizSubmitted) optionClass += ' selected';
              if (quizSubmitted && idx === currentModule.quiz.correctIndex) optionClass += ' correct';
              if (quizSubmitted && selectedOption === idx && idx !== currentModule.quiz.correctIndex) optionClass += ' wrong';
              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleQuizSelect(idx)}
                >
                  <span className="module-option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="module-option-text">{option}</span>
                  {quizSubmitted && idx === currentModule.quiz.correctIndex && (
                    <span className="module-option-check">✓</span>
                  )}
                  {quizSubmitted && selectedOption === idx && idx !== currentModule.quiz.correctIndex && (
                    <span className="module-option-x">✕</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isCorrectAnswer && (
            <div className="module-quiz-feedback correct">
              <span>🎉</span> Correct! {currentModule.quiz.explanation}
            </div>
          )}
          {isWrongAnswer && (
            <div className="module-quiz-feedback wrong">
              <span>💡</span> {currentModule.quiz.explanation}
              <button className="btn btn-sm module-retry-btn" onClick={handleRetry}>
                Try Again
              </button>
            </div>
          )}

          {/* Submit Button */}
          {!quizSubmitted && (
            <button
              className={`btn btn-accent module-submit-btn ${selectedOption === null ? 'disabled' : ''}`}
              onClick={handleQuizSubmit}
              disabled={selectedOption === null}
            >
              Check Answer
            </button>
          )}
        </div>
      </section>
    );
  }

  // ─── Completion Screen ───
  if (step >= completionStep) {
    const stars = attempts <= 1 ? 3 : attempts === 2 ? 2 : 1;

    // Find next module
    const allModules = learningData.flatMap(w => w.modules);
    const currentIdx = allModules.findIndex(m => m.id === currentModuleId);
    const nextModule = currentIdx < allModules.length - 1 ? allModules[currentIdx + 1] : null;

    return (
      <section className="screen module-screen">
        <div className="module-completion">
          <div className="module-completion-emoji">🎉</div>
          <h2 className="module-completion-title">Lesson Complete!</h2>
          <div className="module-completion-module">{currentModule.emoji} {currentModule.title}</div>

          {/* Stars */}
          <div className="module-stars">
            {[1, 2, 3].map(s => (
              <span key={s} className={`module-star ${s <= stars ? 'earned' : ''}`}>★</span>
            ))}
          </div>

          {/* Rewards */}
          <div className="module-rewards">
            <div className="module-reward">
              <span className="module-reward-icon">⚡</span>
              <span className="module-reward-value">+{currentModule.xpReward} XP</span>
            </div>
            <div className="module-reward">
              <span className="module-reward-icon">📊</span>
              <span className="module-reward-value">+{currentModule.creditStoryBonus} Fin Story</span>
            </div>
          </div>

          {/* Actions */}
          <div className="module-completion-actions">
            {nextModule && (
              <button
                className="btn btn-accent"
                onClick={() => {
                  dispatch({ type: 'START_MODULE', moduleId: nextModule.id });
                }}
              >
                Next: {nextModule.emoji} {nextModule.title} →
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => navigate('learn')}
            >
              Back to Academy
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
