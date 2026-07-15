// __tests__/schemas.test.ts
import { describe, it, expect } from "vitest";
import { registerSchema } from "@/lib/userSchema";

describe("Register Schema", () => {
  it("should pass with valid data", () => {
    const result = registerSchema.safeParse({
      username: "eliana",
      password: "Password1",
      confirmPassword: "Password1",
    });
    expect(result.success).toBe(true);
  });

  it("should fail if username is too short", () => {
    const result = registerSchema.safeParse({
      username: "eli", // moins de 4 caractères
      password: "Password1",
      confirmPassword: "Password1",
    });
    expect(result.success).toBe(false);
  });

  it("should fail if passwords do not match", () => {
    const result = registerSchema.safeParse({
      username: "eliana",
      password: "Password1",
      confirmPassword: "Password2", // différent
    });
    expect(result.success).toBe(false);
  });

  it("should fail if password has no uppercase", () => {
    const result = registerSchema.safeParse({
      username: "eliana",
      password: "password1", // pas de majuscule
      confirmPassword: "password1",
    });
    expect(result.success).toBe(false);
  });

  it("should fail if password has no number", () => {
    const result = registerSchema.safeParse({
      username: "eliana",
      password: "Password", // pas de chiffre
      confirmPassword: "Password",
    });
    expect(result.success).toBe(false);
  });
});
