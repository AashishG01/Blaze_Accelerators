export default function FinGauge({ score, size = 80, maxScore = 100 }) {
  const isLarge = size >= 120;
  const radius = isLarge ? 52 : 34;
  const center = size / 2;
  const dasharray = isLarge ? 245 : 160;
  const pct = Math.min(score / maxScore, 1);
  const dashoffset = dasharray * (1 - pct);

  return (
    <div className="cs-gauge-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="gauge-track"
          cx={center} cy={center} r={radius}
          strokeDasharray={dasharray}
          strokeDashoffset={0}
        />
        <circle
          className="gauge-fill"
          cx={center} cy={center} r={radius}
          strokeDasharray={dasharray}
          strokeDashoffset={dashoffset}
        />
      </svg>
      <div className="cs-gauge-score">
        <span className="score-number" style={!isLarge ? { fontSize: '1.5rem' } : undefined}>
          {score}
        </span>
        {isLarge && <span className="score-label">Fin Story</span>}
      </div>
    </div>
  );
}
