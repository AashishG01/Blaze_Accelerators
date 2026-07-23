import { useApp } from '../context/AppContext';

const navItems = [
  {
    key: 'home', label: 'Home',
    icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    key: 'budget', label: 'Budget',
    icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="10" y1="3" x2="10" y2="9"/></svg>,
  },
  {
    key: 'learn', label: 'Learn',
    icon: <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  },
  {
    key: 'ai', label: 'AI Coach',
    icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  },
  {
    key: 'profile', label: 'Profile',
    icon: <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
];

const screenMap = {
  home: 'dashboard',
  budget: 'budget',
  learn: 'learn',
  ai: 'ai-chat',
  profile: 'progress',
};

export default function BottomNav() {
  const { currentScreen, navigate, finScore } = useApp();

  const getActiveKey = () => {
    const reverseMap = {};
    Object.entries(screenMap).forEach(([k, v]) => { reverseMap[v] = k; });
    reverseMap['dashboard-updated'] = 'home';
    reverseMap['fin-timeline'] = 'profile';
    reverseMap['unlock'] = 'profile';
    reverseMap['module'] = 'learn';
    return reverseMap[currentScreen] || 'home';
  };

  const activeKey = getActiveKey();

  const handleClick = (key) => {
    if (key === 'home') {
      navigate(finScore >= 20 ? 'dashboard-updated' : 'dashboard');
    } else {
      navigate(screenMap[key]);
    }
  };

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.key}
          className={`nav-item ${activeKey === item.key ? 'active' : ''}`}
          onClick={() => handleClick(item.key)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
}
