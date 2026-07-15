"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Repeat, Search, Users } from "lucide-react";
import { UserCard } from "./userCard";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface HeroProps {
  featured: User[];
}

const Hero = ({ featured }: HeroProps) => {
  const { data: session } = useSession();
  const t = useTranslations("hero");

  const features = [
    { icon: Users, title: t("realPeople"), text: t("realPeopleText") },
    { icon: Repeat, title: t("fairExchange"), text: t("fairExchangeText") },
    { icon: Search, title: t("easyStart"), text: t("easyStartText") },
  ];

  return (
    <header className="mx-auto max-w-6xl px-8 lg:py-32">
      <section className="max-w-3xl">
        <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          {t("title")} <strong>{t("titleBold")}</strong> <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            {t("titleSpan")} <strong>{t("titleSpanBold")}</strong>
          </span>
        </h1>
        <p className="mt-6 max-w-6xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex gap-3">
          {session?.user ? (
            <Button size="lg" className="bg-[#0e9aaf]">
              <Link
                href="/dashboard"
                className="flex justify-center items-center gap-2"
              >
                {t("dashboard")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="bg-[#0e9aaf]">
              <Link
                href="/login"
                className="flex justify-center items-center gap-2"
              >
                {t("cta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button variant="outline" size="lg">
            <Link href="/explore">{t("browse")}</Link>
          </Button>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-glow/10 text-[#0e9aaf]">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">
              {t("meetTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("meetSubtitle")}</p>
          </div>
          <Link
            href="/explore"
            className="hidden text-sm font-medium text-primary hover:underline md:inline-flex"
          >
            {t("seeAll")}
          </Link>
        </div>
        <div className="mt-8 items-center justify-center grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      </section>
    </header>
  );
};

export default Hero;
