import { useApp } from '../context/AppContext';

export default function AccountTypeScreen() {
  const { navigate } = useApp();

  return (
    <section className="screen">
      <h2 className="screen-title">Choose your account</h2>
      <p className="screen-subtitle">We&apos;ll set it up in under 2 minutes.</p>

      <div className="account-cards stagger">
        <div
          className="card account-card recommended"
          onClick={() => navigate('verification')}
          style={{ cursor: 'pointer' }}
        >
          <span className="badge badge-accent" style={{ marginBottom: 'var(--space-sm)' }}>
            Recommended for first-jobbers
          </span>
          <div className="account-name">💼 Salary Account</div>
          <div className="account-desc">
            Zero-balance account with Fin Story tracking. Built for your first job.
          </div>
        </div>

        <div className="card account-card dimmed">
          <div className="account-name">🏦 Savings Account</div>
          <div className="account-desc">Standard savings with competitive rates.</div>
        </div>

        <div className="card account-card dimmed">
          <div className="account-name">🎓 Student Account</div>
          <div className="account-desc">For students still in college.</div>
        </div>
      </div>
    </section>
  );
}
