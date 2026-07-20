import { createContext, useContext, useReducer, useCallback, useRef } from 'react';

const AppContext = createContext(null);

const initialState = {
  currentScreen: 'splash',
  creditScore: 0,
  salary: 45000,
  quizAnswers: {},
  budgetPcts: { essentials: 30, savings: 25, investments: 20, spending: 25 },
  budgetLocked: false,
  sipAmount: 2000,
  sipStarted: false,
  toastText: '',
  toastVisible: false,
  showConfetti: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentScreen: action.screen };
    case 'ADD_SCORE':
      return { ...state, creditScore: state.creditScore + action.points };
    case 'SET_SALARY':
      return { ...state, salary: action.salary };
    case 'SET_QUIZ_ANSWER':
      return { ...state, quizAnswers: { ...state.quizAnswers, [action.step]: action.value } };
    case 'SET_BUDGET_PCT': {
      return { ...state, budgetPcts: { ...state.budgetPcts, [action.category]: action.value } };
    }
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
    dispatch({ type: 'SHOW_TOAST', text: `+${points} Credit Story` });
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
