"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themes = ["light", "dark", "system"] as const;
type Theme = (typeof themes)[number];

const icons = { light: Sun, dark: Moon, system: Monitor };

function isTheme(value: string | undefined): value is Theme {
  return themes.includes(value as Theme);
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  // Theme is unknown until hydration; render the system icon on the server so
  // the client's first render matches.
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const current: Theme = mounted && isTheme(theme) ? theme : "system";
  const next = themes[(themes.indexOf(current) + 1) % themes.length]!;
  const Icon = icons[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Theme: ${current}`}
      className="ml-8 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 shadow-xs transition-colors hover:bg-slate-200 focus-visible:ring-1 focus-visible:ring-slate-400 focus-visible:outline-hidden dark:border-slate-700 dark:hover:bg-slate-800"
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" />
    </button>
  );
}
