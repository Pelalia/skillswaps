"use client";
import { User } from "@/types";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { UserCard } from "./userCard";
import { useTranslations } from "next-intl";

interface ExploreSearchProps {
  users: User[];
}

const ExploreSearch = ({ users }: ExploreSearchProps) => {
  const t = useTranslations("explore");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        (u.teach ?? []).some((s) => s.toLowerCase().includes(term)) ||
        (u.learn ?? []).some((s) => s.toLowerCase().includes(term)),
    );
  }, [q, users]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search")}
            className="pl-9"
          />
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && q && (
          <p className="text-sm text-muted-foreground col-span-3">
            {t("noResults")}
          </p>
        )}
        {filtered.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </>
  );
};

export default ExploreSearch;
