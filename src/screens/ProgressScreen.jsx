import { useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

const badges = [
  { icon: '🏅', name: 'Day One', desc: 'Opened your account', locked: false },
  { icon: '💰', name: 'First Salary', desc: 'Received first salary', locked: false },
  { icon: '📈', name: 'First SIP', desc: 'Started investing', locked: false },
  { icon: '🔒', name: 'Budget Pro', desc: 'Stick to budget 1 month', locked: true },
  { icon: '🔒', name: 'Emergency Ready', desc: 'Save ₹10,000', locked: true },
  { icon: '🔒', name: 'Credit Card', desc: 'Unlocks at Month 6', locked: true },
];

export default function ProgressScreen() {
  const { navigate } = useApp();
  const donutRef = useRef(null);
  const barRef = useRef(null);
  const drawn = useRef(false);

  const drawDonut = useCallback(() => {
    const canvas = donutRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2, cy = h / 2;
    const radius = Math.min(cx, cy) - 30;
    const inner = radius * 0.6;

    const data = [
      { label: 'Essentials', pct: 30, color: '#4f7cff' },
      { label: 'Savings', pct: 25, color: '#00d68f' },
      { label: 'Investments', pct: 20, color: '#a78bfa' },
      { label: 'Spending', pct: 25, color: '#ffd166' },
    ];

    let start = -Math.PI / 2;
    data.forEach(seg => {
      const slice = (seg.pct / 100) * 2 * Math.PI;
      const end = start + slice;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, start, end);
      ctx.arc(cx, cy, inner, end, start, true);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();

      const mid = start + slice / 2;
      const lx = cx + Math.cos(mid) * (inner + (radius - inner) / 2);
      const ly = cy + Math.sin(mid) * (inner + (radius - inner) / 2);
      ctx.fillStyle = '#fff';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(seg.pct + '%', lx, ly);
      start = end;
    });

    ctx.fillStyle = '#fff';
    ctx.font = '700 16px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₹45,000', cx, cy - 8);
    ctx.fillStyle = '#8892b0';
    ctx.font = '400 11px Inter, sans-serif';
    ctx.fillText('Total Budget', cx, cy + 10);
  }, []);

  const drawBar = useCallback(() => {
    const canvas = barRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const data = [
      { label: 'Savings', value: 11250, target: 11250, color: '#00d68f' },
      { label: 'Investment', value: 9000, target: 9000, color: '#4f7cff' },
      { label: 'Emergency', value: 0, target: 11111, color: '#ffd166' },
    ];

    const maxVal = Math.max(...data.map(d => Math.max(d.value, d.target)));
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    const barW = chartW / data.length * 0.4;
    const gap = chartW / data.length;

    for (let i = 0; i <= 4; i++) {
      const y = pad.top + chartH * (1 - i / 4);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
      ctx.fillStyle = '#4a5568';
      ctx.font = '400 9px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('₹' + Math.round(maxVal * i / 4 / 1000) + 'K', pad.left - 8, y + 3);
    }

    data.forEach((d, i) => {
      const x = pad.left + gap * i + gap / 2 - barW;
      const tH = (d.target / maxVal) * chartH;
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      roundRect(ctx, x - 2, pad.top + chartH - tH, barW * 2 + 4, tH, 4);
      ctx.fill();

      const vH = (d.value / maxVal) * chartH;
      if (vH > 0) {
        ctx.fillStyle = d.color;
        roundRect(ctx, x, pad.top + chartH - vH, barW * 2, vH, 4);
        ctx.fill();
      }

      ctx.fillStyle = '#8892b0';
      ctx.font = '500 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barW, h - pad.bottom + 16);
    });
  }, []);

  useEffect(() => {
    if (drawn.current) return;
    drawn.current = true;
    setTimeout(() => {
      drawDonut();
      drawBar();
    }, 300);
  }, [drawDonut, drawBar]);

  return (
    <section className="screen">
      <h2 className="screen-title">Your Progress</h2>
      <p className="screen-subtitle">Month 1 snapshot</p>

      <div className="charts-section">
        <div className="card chart-card">
          <h4 style={{ marginBottom: 'var(--space-md)' }}>Spending Breakdown</h4>
          <canvas ref={donutRef} style={{ width: '100%', height: 200 }} />
        </div>
        <div className="card chart-card">
          <h4 style={{ marginBottom: 'var(--space-md)' }}>Savings vs Target</h4>
          <canvas ref={barRef} style={{ width: '100%', height: 180 }} />
        </div>
      </div>

      <h4 style={{ marginBottom: 'var(--space-md)' }}>Badges</h4>
      <div className="badges-grid stagger">
        {badges.map((b, i) => (
          <div key={i} className={`card badge-card ${b.locked ? 'locked' : ''}`}>
            <div className="badge-icon">{b.icon}</div>
            <div className="badge-name">{b.name}</div>
            <div className="badge-desc">{b.desc}</div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-accent"
        style={{ marginTop: 'var(--space-xl)' }}
        onClick={() => navigate('credit-timeline')}
      >
        View Credit Story Timeline →
      </button>
    </section>
  );
}
