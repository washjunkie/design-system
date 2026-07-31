'use client';

import * as React from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type Register = 'operator' | 'consumer';
export type Density = 'comfortable' | 'compact';

export type WJConfig = {
  theme: Theme;
  register: Register;
  density: Density;
  /**
   * Per-business accent, as an OKLCH hue in degrees (0–360) and optional
   * chroma. Only the hue travels: lightness stays fixed at the ramp's values so
   * every contrast guarantee in the system survives whatever colour a business
   * picks. See docs/13-white-label.md.
   */
  accent?: { hue: number; chroma?: number } | null;
};

type WJContext = WJConfig & {
  setTheme: (t: Theme) => void;
  setRegister: (r: Register) => void;
  setDensity: (d: Density) => void;
  setAccent: (a: WJConfig['accent']) => void;
  /** The theme actually in effect — `system` resolved against the OS. */
  resolvedTheme: 'light' | 'dark';
};

const Ctx = React.createContext<WJContext | null>(null);

export function useWJ() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('useWJ must be used inside <WJProvider>');
  return ctx;
}

/** Watches the OS preference so `theme: 'system'` keeps tracking it live,
 *  rather than only reading it once on mount. */
function useSystemTheme(): 'light' | 'dark' {
  const [t, setT] = React.useState<'light' | 'dark'>('light');
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setT(mq.matches ? 'dark' : 'light');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return t;
}

export type WJProviderProps = Partial<WJConfig> & {
  children: React.ReactNode;
  /**
   * Where to write the data attributes. Defaults to <html>, which is what you
   * want in an app; pass an element ref to scope a subtree — a light-locked
   * marketing preview inside a dark console, say.
   */
  target?: React.RefObject<HTMLElement | null>;
  /** Persist the user's choice. Off by default; the console stores it server-side. */
  storageKey?: string;
};

export function WJProvider({
  children,
  theme: themeProp = 'system',
  register: registerProp = 'operator',
  density: densityProp = 'comfortable',
  accent: accentProp = null,
  target,
  storageKey,
}: WJProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(themeProp);
  const [register, setRegister] = React.useState<Register>(registerProp);
  const [density, setDensity] = React.useState<Density>(densityProp);
  const [accent, setAccent] = React.useState<WJConfig['accent']>(accentProp);
  const system = useSystemTheme();
  const resolvedTheme = theme === 'system' ? system : theme;

  React.useEffect(() => {
    if (!storageKey) return;
    const saved = window.localStorage.getItem(storageKey) as Theme | null;
    if (saved) setThemeState(saved);
  }, [storageKey]);

  const setTheme = React.useCallback(
    (t: Theme) => {
      setThemeState(t);
      if (storageKey) window.localStorage.setItem(storageKey, t);
    },
    [storageKey]
  );

  React.useEffect(() => {
    const el = target?.current ?? document.documentElement;

    // `system` removes the attribute rather than writing the resolved value, so
    // the CSS media query stays in charge. Writing it would freeze the theme at
    // whatever the OS happened to be when this ran.
    if (theme === 'system') el.removeAttribute('data-wj-theme');
    else el.setAttribute('data-wj-theme', theme);

    el.setAttribute('data-wj-register', register);
    el.setAttribute('data-wj-density', density);

    if (accent) {
      el.style.setProperty('--wj-accent-h', String(accent.hue));
      if (accent.chroma != null) el.style.setProperty('--wj-accent-c', String(accent.chroma));
    } else {
      el.style.removeProperty('--wj-accent-h');
      el.style.removeProperty('--wj-accent-c');
    }
  }, [theme, register, density, accent, target]);

  const value = React.useMemo<WJContext>(
    () => ({ theme, register, density, accent, resolvedTheme, setTheme, setRegister, setDensity, setAccent }),
    [theme, register, density, accent, resolvedTheme, setTheme]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/**
 * Blocking script for the document head. Without it a dark-mode user sees one
 * white frame before hydration — the flash of wrong theme. Inline it in the
 * <head>, before any stylesheet that paints a background.
 */
export const themeScript = (storageKey = 'wj-theme') => `
(function(){try{
  var t = localStorage.getItem(${JSON.stringify(storageKey)});
  if (t && t !== 'system') document.documentElement.setAttribute('data-wj-theme', t);
}catch(e){}})();`;
