import { useApp } from '../context/AppContext';

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const milestoneData = [
  { days: 3, emoji: '🌱', label: 'Sprout' },
  { days: 7, emoji: '🔥', label: 'On Fire' },
  { days: 14, emoji: '⚡', label: 'Unstoppable' },
  { days: 30, emoji: '💎', label: 'Diamond' },
  { days: 60, emoji: '🏆', label: 'Legend' },
  { days: 90, emoji: '👑', label: 'OG' },
];

export default function StreakWidget() {
  const { streakCount, streakBest, streakHistory, streakFreezes, navigate } = useApp();

  // Find the next milestone
  const nextMilestone = milestoneData.find(m => m.days > streakCount) || milestoneData[milestoneData.length - 1];
  const prevMilestone = [...milestoneData].reverse().find(m => m.days <= streakCount);
  const prevDays = prevMilestone ? prevMilestone.days : 0;
  const progressPct = Math.min(
    ((streakCount - prevDays) / (nextMilestone.days - prevDays)) * 100,
    100
  );

  return (
    <div className="streak-widget">
      {/* Streak Header */}
      <div className="streak-header">
        <div className="streak-fire-group">
          <div className={`streak-fire ${streakCount > 0 ? 'active' : 'inactive'}`}>
            🔥
          </div>
          <div className="streak-count-block">
            <div className="streak-count">{streakCount}</div>
            <div className="streak-label">day streak</div>
          </div>
        </div>
        <div className="streak-meta">
          <div className="streak-best">
            <span className="streak-best-icon">⭐</span>
            <span>Best: {streakBest}</span>
          </div>
          {streakFreezes > 0 && (
            <div className="streak-freeze-badge">
              <span>❄️</span>
              <span>{streakFreezes} freeze</span>
            </div>
          )}
        </div>
      </div>

      {/* 7-Day Activity Dots */}
      <div className="streak-dots-section">
        <div className="streak-dots-label">Last 7 days</div>
        <div className="streak-dots">
          {streakHistory.map((active, i) => (
            <div key={i} className="streak-dot-group">
              <div className={`streak-dot ${active ? 'active' : ''} ${i === streakHistory.length - 1 && active ? 'today' : ''}`}>
                {active ? '✓' : ''}
              </div>
              <div className="streak-dot-day">{dayLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="streak-milestone-section">
        <div className="streak-milestone-row">
          <span className="streak-milestone-emoji">{nextMilestone.emoji}</span>
          <span className="streak-milestone-text">
            {nextMilestone.days - streakCount} more day{nextMilestone.days - streakCount !== 1 ? 's' : ''} to <strong>{nextMilestone.label}</strong>
          </span>
        </div>
        <div className="streak-progress-track">
          <div
            className="streak-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="streak-milestones-row">
          {milestoneData.slice(0, 4).map(m => (
            <div
              key={m.days}
              className={`streak-milestone-pip ${streakCount >= m.days ? 'reached' : ''}`}
              title={`${m.label} — ${m.days} days`}
            >
              {m.emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Challenge CTA */}
      <div className="streak-cta" onClick={() => navigate('learn')}>
        <div className="streak-cta-icon">📚</div>
        <div className="streak-cta-text">
          <div className="streak-cta-title">Daily Challenge</div>
          <div className="streak-cta-desc">Complete a lesson to extend your streak</div>
        </div>
        <div className="streak-cta-arrow">›</div>
      </div>
    </div>
  );
}
