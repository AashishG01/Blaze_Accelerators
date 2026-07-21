import { useApp } from '../context/AppContext';

export default function UnlockScreen() {
  const { navigate } = useApp();

  return (
    <section className="screen">
      <h2 className="screen-title">Your future, unlocked.</h2>
      <p className="screen-subtitle">Stay with Day One. Doors open as you grow.</p>

      <div className="unlock-cards stagger">
        {/* Month 6 */}
        <div className="card unlock-card month-6">
          <div className="unlock-month">Month 6</div>
          <div className="card-visual">
            <div className="cv-logo">Day One</div>
            <div className="cv-number">•••• •••• •••• 4521</div>
            <div className="cv-name">RAHUL SHARMA</div>
          </div>
          <div className="unlock-title">Pre-approved Credit Card</div>
          <div className="unlock-desc">
            No CIBIL needed. Your Credit Story IS your score. Zero annual fee, 2% cashback on everything.
          </div>
        </div>

        {/* Month 12 */}
        <div className="card unlock-card month-12">
          <div className="unlock-month">Month 12</div>
          <div className="unlock-title">Pre-approved Personal Loan</div>
          <div className="unlock-desc">
            ₹2,00,000 at 10.5% — 3% below market rate, because the bank verified your on-time financial behavior.
            No paperwork, instant disbursal.
          </div>
        </div>

        {/* Month 18 */}
        <div className="card unlock-card month-18" style={{ borderLeft: '3px solid #ffd166', background: 'rgba(255, 209, 102, 0.05)' }}>
          <div className="unlock-month" style={{ color: '#ffd166' }}>Month 18</div>
          <div className="unlock-title">Salary Overdraft Buffer</div>
          <div className="unlock-desc">
            Instant liquidity up to 2x salary (₹90,000) at 0% interest for 15 days. Flexible safety net when unexpected life expenses hit.
          </div>
        </div>

        {/* Month 24 */}
        <div className="card unlock-card month-24">
          <div className="unlock-month">Month 24</div>
          <div className="unlock-title">Home Loan Fast-Track</div>
          <div className="unlock-desc">
            Priority processing, preferred rates. Your 2-year Credit Story speaks louder than any paperwork.
          </div>
        </div>
      </div>

      <div className="unlock-closing">
        <p>This is why you stay. Not for rewards. Not for cashback.</p>
        <p style={{ marginTop: 'var(--space-md)', fontSize: '1.125rem' }}>
          Because <strong>no other bank watched you build this from Day One.</strong>
        </p>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('dashboard-updated')}>
        Explore Dashboard →
      </button>
    </section>
  );
}
