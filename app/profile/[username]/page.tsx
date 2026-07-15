import { getUserById, getUserByUsername } from "@/lib/users";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, } from "lucide-react";
import Link from "next/link";
import { SkillBadge } from "@/components/skillBadge";

import Image from "next/image";
import { auth } from "@/auth";
import { SwapRequestDialog } from "@/components/dialog";


import { getTranslations } from "next-intl/server";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const t = await getTranslations("profile"); 

  const user = await getUserByUsername(username);
  if (!user) notFound();

  const session = await auth();
  const me = session?.user?.id ? await getUserById(session.user.id) : null;
  const isMe =
    session?.user?.name?.replace(/\s+/g, "").toLowerCase() ===
    username.toLowerCase();

  return (
    <div className="min-h-screen bg-green-50/50">
      <Link
        href="/explore"
        className="sticky md:fixed mx-4 my-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t("back")}
      </Link>
      <main className="mx-auto md:max-w-4xl justify-center items-center max-w-5xl px-6 py-4 md:py-10">
        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
          <div
            className="h-28 md:h-40"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="px-8 pb-8">
            <div className="-mt-12 md:-mt-14 flex flex-wrap items-end justify-between gap-4">
              <Image
                src={user.avatarUrl}
                alt={user.username}
                width={120}
                height={120}
                className="h-20 w-20 md:h-28 object-cover rounded-2xl border-4 border-card bg-secondary"
              />
              {!isMe && session?.user && (
                <SwapRequestDialog
                  targetUser={{
                    id: user.id,
                    username: user.username,
                    teach: user.teach ?? [],
                  }}
                  myTeaches={me?.teach ?? []}
                />
              )}
            </div>
            <h1 className="mt-4 text-3xl font-bold">{user.username}</h1>
            {user.location && (
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" /> {user.location}
              </p>
            )}
            {user.bio && (
              <p className="mt-4 max-w-2xl text-foreground/80">{user.bio}</p>
            )}

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  {t("teaches")}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.teach?.length ? (
                    user.teach.map((s: string) => (
                      <SkillBadge key={s} variant="teach">
                        {s}
                      </SkillBadge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {t("nothing")}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-destructive">
                  {t("learns")}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.learn?.length ? (
                    user.learn.map((s: string) => (
                      <SkillBadge key={s} variant="learn">
                        {s}
                      </SkillBadge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {t("nothing")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
