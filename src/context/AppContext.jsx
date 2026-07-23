import { createContext, useContext, useReducer, useCallback, useRef } from 'react';

const AppContext = createContext(null);

const initialState = {
  currentScreen: 'splash',
  finScore: 0,
  salary: 45000,
  quizAnswers: {},
  budgetPcts: { essentials: 30, savings: 25, investments: 20, spending: 25 },
  budgetLocked: false,
  sipAmount: 2000,
  sipStarted: false,
  toastText: '',
  toastVisible: false,
  showConfetti: false,

  // ─── Streak System ───
  streakCount: 3,
  streakBest: 5,
  lastActiveDate: 'today',
  streakFreezes: 1,
  streakHistory: [1, 1, 1, 0, 0, 1, 1], // last 7 days (1=active, 0=inactive)
  streakMilestones: [
    { days: 3, label: '🌱 Sprout', points: 5, reached: true },
    { days: 7, label: '🔥 On Fire', points: 10, reached: false },
    { days: 14, label: '⚡ Unstoppable', points: 15, reached: false },
    { days: 30, label: '💎 Diamond Hands', points: 25, reached: false },
    { days: 60, label: '🏆 Legend', points: 40, reached: false },
    { days: 90, label: '👑 Day One OG', points: 60, reached: false },
  ],

  // ─── Finance Academy ───
  completedModules: [],   // Array of completed module IDs
  currentModuleId: null,  // Which module is being played
  currentModuleStep: 0,   // 0 = intro, 1-3 = slides, 4 = quiz, 5 = completion
  moduleStars: {},        // { moduleId: starCount }
  xp: 150,
  totalXp: 150,
};

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentScreen: action.screen };
    case 'ADD_SCORE':
      return { ...state, finScore: state.finScore + action.points };
    case 'SET_SALARY':
      return { ...state, salary: action.salary };
    case 'SET_QUIZ_ANSWER':
      return { ...state, quizAnswers: { ...state.quizAnswers, [action.step]: action.value } };
    case 'SET_BUDGET_PCT': {
      return { ...state, budgetPcts: { ...state.budgetPcts, [action.category]: action.value } };
    }
    case 'SET_BUDGET_ALL':
      return { ...state, budgetPcts: action.pcts };
    case 'LOCK_BUDGET':
      return { ...state, budgetLocked: true };
    case 'SET_SIP_AMOUNT':
      return { ...state, sipAmount: action.amount };
    case 'START_SIP':
      return { ...state, sipStarted: true };
    case 'SHOW_TOAST':
      return { ...state, toastText: action.text, toastVisible: true };
    case 'HIDE_TOAST':
      return { ...state, toastVisible: false };
    case 'FIRE_CONFETTI':
      return { ...state, showConfetti: true };
    case 'STOP_CONFETTI':
      return { ...state, showConfetti: false };

    // ─── Streak Actions ───
    case 'INCREMENT_STREAK':
      return {
        ...state,
        streakCount: state.streakCount + 1,
        streakBest: Math.max(state.streakBest, state.streakCount + 1),
        lastActiveDate: 'today',
        streakHistory: [...state.streakHistory.slice(1), 1],
      };
    case 'USE_STREAK_FREEZE':
      return {
        ...state,
        streakFreezes: Math.max(0, state.streakFreezes - 1),
        streakHistory: [...state.streakHistory.slice(1), 0],
      };
    case 'BREAK_STREAK':
      return {
        ...state,
        streakCount: 0,
        lastActiveDate: null,
        streakHistory: [...state.streakHistory.slice(1), 0],
      };

    // ─── Learning Actions ───
    case 'START_MODULE':
      return {
        ...state,
        currentModuleId: action.moduleId,
        currentModuleStep: 0,
      };
    case 'NEXT_MODULE_STEP':
      return { ...state, currentModuleStep: state.currentModuleStep + 1 };
    case 'COMPLETE_MODULE':
      return {
        ...state,
        completedModules: state.completedModules.includes(action.moduleId)
          ? state.completedModules
          : [...state.completedModules, action.moduleId],
        moduleStars: { ...state.moduleStars, [action.moduleId]: action.stars },
        xp: state.xp + action.xpReward,
        totalXp: state.totalXp + action.xpReward,
      };
    case 'ADD_XP':
      return {
        ...state,
        xp: state.xp + action.amount,
        totalXp: state.totalXp + action.amount,
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toastTimer = useRef(null);

  const navigate = useCallback((screen) => {
    dispatch({ type: 'NAVIGATE', screen });
    window.scrollTo(0, 0);
  }, []);

  const addScore = useCallback((points) => {
    dispatch({ type: 'ADD_SCORE', points });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    dispatch({ type: 'SHOW_TOAST', text: `+${points} Fin Story` });
    toastTimer.current = setTimeout(() => {
      dispatch({ type: 'HIDE_TOAST' });
    }, 2500);
  }, []);

  const fireConfetti = useCallback(() => {
    dispatch({ type: 'FIRE_CONFETTI' });
    setTimeout(() => dispatch({ type: 'STOP_CONFETTI' }), 3500);
  }, []);

  const value = {
    ...state,
    dispatch,
    navigate,
    addScore,
    fireConfetti,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
