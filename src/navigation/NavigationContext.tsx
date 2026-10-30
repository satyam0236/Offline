import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * A deliberately minimal stack-based navigator built on useContext,
 * matching the state-management approach you wanted for now (no
 * react-navigation dependency yet — swap this out later if you need
 * native transitions, deep linking, or gesture-based back navigation).
 */
export type ScreenName =
  | 'Splash'
  | 'Onboarding'
  | 'Home'
  | 'Nearby'
  | 'Chat'
  | 'GamesLobby'
  | 'Settings'
  | 'Call';

export interface NavParams {
  [key: string]: unknown;
}

interface StackEntry {
  screen: ScreenName;
  params?: NavParams;
}

interface NavigationContextValue {
  current: ScreenName;
  params?: NavParams;
  navigate: (screen: ScreenName, params?: NavParams) => void;
  replace: (screen: ScreenName, params?: NavParams) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<StackEntry[]>([{ screen: 'Splash' }]);

  const navigate = useCallback((screen: ScreenName, params?: NavParams) => {
    setStack(prev => [...prev, { screen, params }]);
  }, []);

  const replace = useCallback((screen: ScreenName, params?: NavParams) => {
    setStack(prev => [...prev.slice(0, -1), { screen, params }]);
  }, []);

  const goBack = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const top = stack[stack.length - 1];

  const value = useMemo<NavigationContextValue>(
    () => ({
      current: top.screen,
      params: top.params,
      navigate,
      replace,
      goBack,
      canGoBack: stack.length > 1,
    }),
    [top, stack.length, navigate, replace, goBack],
  );

  return (
    <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return ctx;
}
