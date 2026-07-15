"use client";
import { useTransition } from "react";
import { useLocale } from "next-intl";

export function LocaleSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "fr" : "en";

    
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;

    
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <button
        onClick={switchLocale}
        disabled={isPending}
        className="rounded-lg px-2 py-1.5 text-sm font-medium border border-border hover:bg-secondary transition-colors"
      >
        {locale === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}
      </button>
    </div>
  );
}
