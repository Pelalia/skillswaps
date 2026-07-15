import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { SkillBadge } from "./skillBadge";

interface Props {
  label: string;
  variant: "teach" | "learn";
  value: string[];
  onChange: (next: string[]) => void;
}

export function SkillsEditor({ label, variant, value, onChange }: Props) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
    setDraft("");
  };
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-2 flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a skill"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" onClick={add} variant="secondary" className="bg-primary-glow/10 text-primary-glow border-primary-glow/20 hover:bg-primary-glow/20 cursor-pointer">
          Add
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {value.map((s) => (
          <SkillBadge key={s} variant={variant}>
            {s}
            <button
              type="button"
              className="ml-1 opacity-60 hover:opacity-100"
              onClick={() => onChange(value.filter((x) => x !== s))}
            >
              <X className="h-3 w-3" />
            </button>
          </SkillBadge>
        ))}
        {value.length === 0 && (
          <p className="text-xs text-muted-foreground">No skills yet.</p>
        )}
      </div>
    </div>
  );
}
