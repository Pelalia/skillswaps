import { describe, it, expect } from "vitest";

// On va tester des fonctions pures d'abord — pas besoin de MongoDB
describe("Username validation", () => {
  it("should format username correctly", () => {
    const username = "Pelalia AMEGATSE";
    const formatted = username.replace(/\s+/g, "").toLowerCase();
    expect(formatted).toBe("pelaliaamegatse");
  });

  it("should generate correct avatar URL", () => {
    const username = "eliana";
    const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`;
    expect(avatarUrl).toContain("eliana");
    expect(avatarUrl).toContain("dicebear");
  });

  it("should detect empty username", () => {
    const username = "";
    expect(username.length).toBe(0);
  });
});
