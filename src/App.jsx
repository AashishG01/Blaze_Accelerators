import { AppProvider, useApp } from './context/AppContext';
import ScoreToast from './components/ScoreToast';
import Confetti from './components/Confetti';
import BottomNav from './components/BottomNav';

import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AccountTypeScreen from './screens/AccountTypeScreen';
import VerificationScreen from './screens/VerificationScreen';
import QuizScreen from './screens/QuizScreen';
import DashboardScreen from './screens/DashboardScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import BudgetScreen from './screens/BudgetScreen';
import AIChatScreen from './screens/AIChatScreen';
import SIPScreen from './screens/SIPScreen';
import GoalsScreen from './screens/GoalsScreen';
import ProgressScreen from './screens/ProgressScreen';
import CreditTimelineScreen from './screens/CreditTimelineScreen';
import UnlockScreen from './screens/UnlockScreen';

const screens = {
  'splash': SplashScreen,
  'onboarding': OnboardingScreen,
  'account-type': AccountTypeScreen,
  'verification': VerificationScreen,
  'quiz': QuizScreen,
  'dashboard': DashboardScreen,
  'celebration': CelebrationScreen,
  'budget': BudgetScreen,
  'ai-chat': AIChatScreen,
  'sip': SIPScreen,
  'goals': GoalsScreen,
  'dashboard-updated': DashboardScreen, // Same component, renders based on creditScore
  'progress': ProgressScreen,
  'credit-timeline': CreditTimelineScreen,
  'unlock': UnlockScreen,
};

const noNavScreens = ['splash', 'onboarding', 'account-type', 'verification', 'quiz', 'celebration'];

function AppContent() {
  const { currentScreen } = useApp();
  const Screen = screens[currentScreen];
  const showNav = !noNavScreens.includes(currentScreen);

  return (
    <>
      {/* Global SVG defs for gauge gradient */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d68f" />
            <stop offset="100%" stopColor="#4f7cff" />
          </linearGradient>
        </defs>
      </svg>

      <Confetti />
      <ScoreToast />

      <div className="app-container">
        {Screen && <Screen key={currentScreen} />}
      </div>

      {showNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
