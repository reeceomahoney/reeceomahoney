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
      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted hover:text-fg focus-visible:ring-1 focus-visible:ring-rule focus-visible:outline-hidden"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
