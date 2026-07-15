"use client";

import { User } from "@/types";
import { useState } from "react";
import { SkillBadge } from "./skillBadge";
import { Button } from "./ui/button";
import { SkillsEditor } from "./skillsEdirtor";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import Image from "next/image";
import { Inbox, MapPin, Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface DashboardClientProps {
  users: User;
  pendingCount: number;
}

const DashboardClient = ({ users, pendingCount }: DashboardClientProps) => {
  const t = useTranslations("dashboard");
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(users.bio ?? "");
  const [location, setLocation] = useState(users.location ?? "");
  const [teach, setTeach] = useState<string[]>(users.teach ?? []);
  const [learn, setLearn] = useState<string[]>(users.learn ?? []);
  const router = useRouter();

  const save = async () => {
  const res =   await fetch(`/api/users/${users.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ bio, location, teach, learn }),
  });
    
    if (res.ok) {
      toast.success('Profile update succes!')
    } else {
      toast.error('something went wrong!')
    }
    router.refresh();
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-green-50/40">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t("welcome")}</p>
            <h1 className="font-display text-4xl font-bold">
              {t("hi")}, {users.username.split(" ")[0]} 👋
            </h1>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              <Link
                href="/requests"
                className="flex justify-center items-center gap-2"
              >
                <Inbox className="h-4 w-4" /> {t("requests")}
                {pendingCount > 0 && (
                  <span className="ml-1 rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-semibold">
                    {pendingCount}
                  </span>
                )}
              </Link>
            </Button>
            {!editing && (
              <Button
                variant="outline"
                onClick={() => setEditing(true)}
                className="bg-primary-glow/10 text-primary-glow border-primary-glow/20 hover:bg-primary-glow/20"
              >
                <Pencil className="h-4 w-4" /> {t("editProfile")}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Image
              src={users.avatarUrl}
              alt={users.username}
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl bg-secondary"
            />
            <h2 className="mt-4 text-xl font-semibold">{users.username}</h2>
            {users.location && (
              <p className="mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" /> {users.location}
              </p>
            )}
            <p className="mt-4 text-sm">
              {users.bio || (
                <span className="italic text-muted-foreground">
                  {t("addBio")}
                </span>
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            {editing ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>{t("location")}</Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t("locationPlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("bio")}</Label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder={t("bioPlaceholder")}
                  />
                </div>
                <SkillsEditor
                  label={t("canTeach")}
                  variant="teach"
                  value={teach}
                  onChange={setTeach}
                />
                <SkillsEditor
                  label={t("wantLearn")}
                  variant="learn"
                  value={learn}
                  onChange={setLearn}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={save}
                    className="bg-primary-glow/10 text-primary-glow border-primary-glow/20 hover:bg-primary-glow/20 cursor-pointer"
                  >
                    {t("save")}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setEditing(false)}
                    className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 cursor-pointer"
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                    {t("canTeach")}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {users.teach.length ? (
                      users.teach.map((s) => (
                        <SkillBadge key={s} variant="teach">
                          {s}
                        </SkillBadge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {t("noTeach")}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-destructive">
                    {t("wantLearn")}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {users.learn.length ? (
                      users.learn.map((s) => (
                        <SkillBadge key={s} variant="learn">
                          {s}
                        </SkillBadge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {t("noLearn")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardClient;
