import { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const chipResponses = {
  sip: "Based on your ₹9,000 investment budget and balanced risk profile, I recommend:\n\n📊 Nifty 50 Index Fund\n• ₹2,000/month SIP\n• Medium risk, ~12% annual returns\n• Your ₹2,000 becomes ~₹3.5L in 10 years\n\nWant to start this SIP?",
  emergency: "An emergency fund should cover 3-6 months of expenses.\n\n• Your essentials: ₹13,500/month\n• Target: ₹81,000 – ₹1,00,000\n• From your savings allocation: ~9 months\n\nI've already set this as one of your goals! 🚨",
  tax: "Great question! As a first-year earner:\n\n• Income up to ₹7L: Zero tax under new regime\n• Your ₹45,000/month = ₹5.4L/year\n• You're in the zero tax bracket! 🎉\n\nBut SIP investments in ELSS can save tax when you earn more.",
};

export default function AIChatScreen() {
  const { navigate, salary, addScore } = useApp();
  const [messages, setMessages] = useState([]);
  const [phase, setPhase] = useState(0); // conversation phase
  const [showChips, setShowChips] = useState(false);
  const [usedChips, setUsedChips] = useState({});
  const [showContinue, setShowContinue] = useState(false);
  const messagesEndRef = useRef(null);
  const initRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const addMessage = useCallback((msg) => {
    setMessages(prev => [...prev, msg]);
    setTimeout(scrollToBottom, 100);
  }, [scrollToBottom]);

  const addTypingThenAI = useCallback((text, creditText, delay = 1500) => {
    addMessage({ type: 'typing' });

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.type !== 'typing'));
      addMessage({ type: 'ai', text, creditText });
    }, delay);
  }, [addMessage]);

  // Main conversation flow
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const spending = Math.round(salary * 0.25);

    // Phase 0: User asks about Goa
    setTimeout(() => {
      addMessage({ type: 'user', text: 'Can I afford a Goa trip? 🏖️' });
      setPhase(1);
    }, 500);

    // Phase 1: AI responds
    setTimeout(() => {
      addTypingThenAI(
        `Based on your numbers, Rahul:\n\n` +
        `• Your spending money: ₹${spending.toLocaleString('en-IN')}/month\n` +
        `• Goa trip estimate: ~₹15,000\n` +
        `• Save ₹5,000/month from spending → Goa in 3 months\n\n` +
        `That's totally doable without touching savings or investments. Want me to create a Goa goal?`
      );
      setPhase(2);
    }, 1500);

    // Phase 2: Show action button
    setTimeout(() => {
      addMessage({ type: 'action', text: 'Yes, create it! 🏖️' });
      setPhase(3);
    }, 4500);
  }, [salary, addMessage, addTypingThenAI]);

  const handleAction = () => {
    // Replace action with user bubble
    setMessages(prev => prev.map(m =>
      m.type === 'action' ? { type: 'user', text: m.text } : m
    ));

    // AI responds with credit
    setTimeout(() => {
      addTypingThenAI(
        'Done! 🎉 Goa Trip goal created — ₹15,000 in 3 months.',
        '+3 Fin Story',
        1200
      );
      addScore(3);
    }, 300);

    // Show chips and continue button after
    setTimeout(() => {
      setShowChips(true);
      setShowContinue(true);
    }, 2500);
  };

  const handleChip = (key, label) => {
    if (usedChips[key]) return;
    setUsedChips(prev => ({ ...prev, [key]: true }));

    addMessage({ type: 'user', text: label });
    addTypingThenAI(chipResponses[key]);
  };

  return (
    <section className="screen chat-screen" style={{ paddingBottom: '140px' }}>
      {/* Header */}
      <div className="chat-header">
        <div className="ai-avatar" style={{ width: 36, height: 36, fontSize: '1rem' }}>🤖</div>
        <div className="chat-header-info">
          <h3>AI Coach</h3>
          <div className="chat-status">● Online — knows your numbers</div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => {
          if (msg.type === 'typing') {
            return (
              <div key={i} className="typing-indicator">
                <span /><span /><span />
              </div>
            );
          }
          if (msg.type === 'action') {
            return (
              <div key={i} style={{ alignSelf: 'flex-end' }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: 'auto' }}
                  onClick={handleAction}
                >
                  {msg.text}
                </button>
              </div>
            );
          }
          return (
            <div key={i} className={`chat-bubble ${msg.type}`} style={{ whiteSpace: 'pre-line' }}>
              {msg.text}
              {msg.creditText && (
                <div className="cs-inline">⚡ {msg.creditText}</div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Chips */}
      {showChips && (
        <div className="chat-chips" style={{ display: 'flex' }}>
          {[
            { key: 'sip', label: 'Best SIP for me?' },
            { key: 'emergency', label: 'Emergency fund?' },
            { key: 'tax', label: 'How do taxes work?' },
          ].map(chip => (
            <button
              key={chip.key}
              className="btn-chip"
              style={usedChips[chip.key] ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
              onClick={() => handleChip(chip.key, chip.label)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* Continue button */}
      {showContinue && (
        <div style={{ textAlign: 'center', padding: 'var(--space-md) 0' }}>
          <button
            className="btn btn-accent btn-sm"
            style={{ width: 'auto', padding: '12px 24px' }}
            onClick={() => navigate('sip')}
          >
            Start your first SIP →
          </button>
        </div>
      )}

      {/* Chat input area */}
      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input type="text" placeholder="Ask anything about your money..." readOnly />
          <button className="chat-send">↑</button>
        </div>
      </div>
    </section>
  );
}
