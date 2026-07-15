"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface SwapRequestDialogProps {
  targetUser: {
    id: string;
    username: string;
    teach: string[];
  };
  myTeaches: string[];
}

export function SwapRequestDialog({
  targetUser,
  myTeaches,
}: SwapRequestDialogProps) {
  const t = useTranslations("profile");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [offering, setOffering] = useState("");
  const [wanting, setWanting] = useState("");

  const send = async () => {
    if (!offering || !wanting) {
      toast.error(t("offer") + " & " + t("want"));
      return;
    }

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toUserId: targetUser.id,
        offering: [offering],
        wanting: [wanting],
        message,
      }),
    });

    if (!res.ok) {
      toast.error("Something went wrong.");
      return;
    }

    toast.success(`${t("sendRequest")} ${targetUser.username}!`);
    setOpen(false);
    setMessage("");
    setOffering("");
    setWanting("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-center gap-2 bg-[#0e9aaf] text-primary-foreground shadow hover:bg-primary/90 px-2 py-1 rounded-lg text-sm font-medium transition-colors">
        <Send className="h-3 w-3" />
        {t("sendRequest")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("swap")} {targetUser.username}
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t("offer")}</Label>
            <Select
              value={offering}
              onValueChange={(value) => value && setOffering(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("offerPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {myTeaches.length > 0 ? (
                  myTeaches.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="_none" disabled>
                    {t("addSkillsFirst")}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label>{t("want")}</Label>
            <Select
              value={wanting}
              onValueChange={(value) => value && setWanting(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("wantPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {targetUser.teach.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("message")}</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder={t("messagePlaceholder")}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={send}>{t("send")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
