"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React from "react";
import { RegisterFormData, registerSchema } from "@/lib/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password", "");
  const rules = [
    { label: "At least 6 characters", ok: password.length >= 6 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "One lowercase letter", ok: /[a-z]/.test(password) },
    { label: "One number", ok: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success('Account Created!')
      router.push("/login");
    } else {
      const errorData = await res.json();
      toast.error(errorData.message);
      setServerError(errorData.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .auth-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 180, 255, 0.06) 0%, transparent 70%);
          top: -200px;
          left: -100px;
          pointer-events: none;
        }

        .auth-root::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 255, 180, 0.05) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: #111118;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 40px 36px;
          position: relative;
          z-index: 1;
          animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }

        .brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #63ffb4, #63b4ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: #0a0a0f;
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 26px;
          color: #fff;
          letter-spacing: -0.5px;
          margin: 0 0 6px;
        }

        .auth-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 28px;
        }

        .auth-subtitle a {
          color: #63ffb4;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-subtitle a:hover { text-decoration: underline; }

        .oauth-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 24px;
        }

        .oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.75);
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .oauth-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .divider-text {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
        }

        .field {
          margin-bottom: 16px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
          letter-spacing: 0.2px;
        }

        .input-wrap { position: relative; }

        .field-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .field-input::placeholder { color: rgba(255,255,255,0.2); }

        .field-input:focus {
          border-color: rgba(99, 255, 180, 0.4);
          background: rgba(99, 255, 180, 0.04);
        }

        .field-input.has-error { border-color: rgba(255, 99, 99, 0.5); }
        .field-input.with-toggle { padding-right: 42px; }

        .toggle-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .toggle-btn:hover { color: rgba(255,255,255,0.7); }

        .field-error {
          margin-top: 6px;
          font-size: 12px;
          color: #ff6363;
        }

        .password-rules {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-top: 10px;
        }

        .rule {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: rgba(255,255,255,0.3);
          transition: color 0.2s;
        }

        .rule.ok { color: #63ffb4; }

        .rule-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .rule.ok .rule-dot {
          background: #63ffb4;
          border-color: #63ffb4;
          color: #0a0a0f;
        }

        .server-error {
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255, 99, 99, 0.08);
          border: 1px solid rgba(255, 99, 99, 0.2);
          color: #ff6363;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #63ffb4, #63b4ff);
          color: #0a0a0f;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
           @media (max-width: 480px) {
           .auth-card{padding: 28px 20px;
           border-radius: 16px;
           }
           .auht-title{font-size: 22px;
           }
           .oauth-grid{grid-template-columns: 1fr 1fr;}
           .password-rules{grid-template-columns: 1fr;}
           }

           @media (max-width: 360px) {
            grid-template-columns: 1fr;
           }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <div className="brand">
            <div className="brand-mark"><Sparkles/></div>
            <span className="brand-name">skillSwap</span>
          </div>

          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">
            Already have one? <Link href="/login">Sign in</Link>
          </p>

          <div className="oauth-grid">
            <button
              type="button"
              className="oauth-btn"
              onClick={() =>
                signIn("google", { callbackUrl: "/", prompt: "select_account" })
              }
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="oauth-btn"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <GithubIcon />
              GitHub
            </button>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or create with username</span>
            <div className="divider-line" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="field-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className={`field-input ${errors.username ? "has-error" : ""}`}
                placeholder="choose_a_username"
                {...register("username")}
              />
              {errors.username && (
                <p className="field-error">{errors.username.message}</p>
              )}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <div className="input-wrap">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`field-input with-toggle ${errors.password ? "has-error" : ""}`}
                  placeholder="••••••••"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {/* Live password rules */}
              {password.length > 0 && (
                <div className="password-rules">
                  {rules.map((r) => (
                    <div key={r.label} className={`rule ${r.ok ? "ok" : ""}`}>
                      <div className="rule-dot">{r.ok && <CheckIcon />}</div>
                      {r.label}
                    </div>
                  ))}
                </div>
              )}
              {errors.password && (
                <p className="field-error">{errors.password.message}</p>
              )}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="input-wrap">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  className={`field-input with-toggle ${errors.confirmPassword ? "has-error" : ""}`}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="field-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {serverError && <div className="server-error">{serverError}</div>}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
