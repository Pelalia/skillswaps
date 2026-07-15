"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnrichedSwapRequest } from "@/types";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { SkillBadge } from "./skillBadge";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface RequestTabsProps {
  incoming: EnrichedSwapRequest[];
  outgoing: EnrichedSwapRequest[];
}

const RequestsTabs = ({ incoming, outgoing }: RequestTabsProps) => {
  const t = useTranslations("requests");
  const route = useRouter();

  const respond = async (
    req: EnrichedSwapRequest,
    status: "accepted" | "rejected",
  ) => {
   const res = await fetch(`/api/requests/${req.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
   });
    if (res.ok) {
      if (status === 'accepted') {
        toast.success('Request accepted! 🎉')
      } else {
        toast.error('something went wrong')
      }
    } else {
      toast.error('something went wrong')
    }
    route.refresh();
  };

  const Card = ({
    req,
    side,
  }: {
    req: EnrichedSwapRequest;
    side: "in" | "out";
  }) => {
    const other = side === "in" ? req.fromUser : req.toUser;
    if (!other) return null;
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/profile/${other?.username}`}
            className="flex items-center gap-3"
          >
            <Image
              src={other.avatarUrl}
              alt={other.username}
              width={96}
              height={96}
              className="h-12 w-12 rounded-full bg-secondary"
            />
            <div>
              <p className="font-semibold">{other.username}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(req.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              req.status === "pending"
                ? "bg-secondary text-secondary-foreground"
                : req.status === "accepted"
                  ? "bg-primary-glow/10 text-primary-glow border-primary-glow/20"
                  : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {req.status}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {(req.offering ?? []).map((s) => (
            <SkillBadge key={s} variant="teach">
              {s}
            </SkillBadge>
          ))}
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          {(req.wanting ?? []).map((s) => (
            <SkillBadge key={s} variant="learn">
              {s}
            </SkillBadge>
          ))}
        </div>
        {req.message && (
          <p className="mt-3 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            {req.message}
          </p>
        )}
        {side === "in" && req.status === "pending" && (
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              onClick={() => respond(req, "accepted")}
              className="bg-primary-glow/10 text-primary-glow border-primary-glow/20 hover:bg-primary-glow/20 cursor-pointer"
            >
              {t("accept")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => respond(req, "rejected")}
              className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 cursor-pointer"
            >
              {t("decline")}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-green-50/40">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <Tabs defaultValue="in" className="mt-8">
          <TabsList>
            <TabsTrigger value="in">
              {t("incoming")} ({incoming.length})
            </TabsTrigger>
            <TabsTrigger value="out">
              {t("sent")} ({outgoing.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="in" className="mt-6 space-y-4">
            {incoming.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("noIncoming")}</p>
            )}
            {incoming.map((r) => (
              <Card key={r.id} req={r} side="in" />
            ))}
          </TabsContent>
          <TabsContent value="out" className="mt-6 space-y-4">
            {outgoing.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("noOutgoing")}</p>
            )}
            {outgoing.map((r) => (
              <Card key={r.id} req={r} side="out" />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RequestsTabs;
