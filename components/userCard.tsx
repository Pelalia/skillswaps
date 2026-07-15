import Link from "next/link";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { SkillBadge } from "./skillBadge";
import { User } from "@/types";

export function UserCard({ user }: { user: User }) {
  return (
    <Link
      href={`/profile/${encodeURIComponent(user.username)}`}
      className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
    >
      <div className="flex items-center gap-4">
        <Image
          src={user.avatarUrl}
          alt='avatar'
          width={33}
          height={33}
          className="h-14 w-14 rounded-full bg-primary-glow/10 object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-foreground">
            {user.username}
          </h3>
          {user.location && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {user.location}
            </p>
          )}
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
        {user.bio}
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex shrink items-center gap-1.5">
          <span className="text-[10px] text-primary-glow/80 font-bold uppercase tracking-wider">
            Teaches:
          </span>
          {user.teach.map((s) => (
            <SkillBadge key={s} variant="teach">
              {s}
            </SkillBadge>
          ))}
        </div>
        <div className="flex flex-nowrap items-center gap-1.5">
          <span className="text-[10px] text-destructive/80 font-bold uppercase tracking-wider">
            Wants:
          </span>
          {user.learn.map((s) => (
            <SkillBadge key={s} variant="learn">
              {s}
            </SkillBadge>
          ))}
        </div>
      </div>
    </Link>
  );
}
