'use client'
import { ArrowRight, Menu, Sparkles, X } from "lucide-react"
import Link from "next/link"
import {useRouter} from 'next/navigation'
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { LocaleSwitcher } from "./localeSwitcher"

const Navbar = () => {
    const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    if (session?.user) { 
      fetch('/api/requests/pending')
        .then(res => res.json())
        .then(data => {
          setPendingCount(data.count)
        })
        .catch(err => {
          console.error('Error fetching pending requests:', err)
        })
    }
  }, [session])
 
    const t = useTranslations('nav')
    const navLinks = session?.user ?  [
        {to: '/explore' as const, label: t('explore')},
        {to: '/dashboard' as const, label: t('dashboard')},
        {to: '/requests' as const, label: t('requests')},
    ]: [
        {to: '/explore' as const, label: t('explore')},
    ]
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-green-50/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-caveat font-bold text-lg">SkillSwaps</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={`relative overflow-visible rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${router}.pathname === link.to ? "bg-secondary text-foreground" : ""}`}
            >
              {l.label}
              {l.to === "/requests" && pendingCount > 0 && (
                <span className="absolute top-2 right-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="animate-pulse  relative inline-flex h-1 w-1 rounded-full bg-green-600 "></span>
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          {session?.user ? (
            <>
              <Link
                href={`/profile/${session.user.name?.replace(/\s+/g, "").toLocaleLowerCase()}`}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 pr-4 text-sm hover:border-primary/40"
              >
                <Image
                  src={
                    session?.user?.image ??
                    "https://api.dicebear.com/7.x/notionists/svg?seed=Pelalia"
                  }
                  alt={session?.user?.name || "User Avatar"}
                  width={25}
                  height={25}
                  className="rounded-full bg-primary-glow/10 object-cover"
                />
                <span className="font-medium">{session?.user.name}</span>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
              >
                {t("logout")} <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="hidden justify-center items-center gap-2 md:flex">
              <Button variant="ghost" size="sm">
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button size="lg" className="bg-[#0e9aaf]">
                <Link href="/register">{t("getStarted")}</Link>
              </Button>
            </div>
          )}
        </div>
        <div className="-mr-30 md:hidden">
          <LocaleSwitcher />
        </div>
        <button
          className="rounded-lg p-2 md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-border bg-backoung/30 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <Link key={l.to} href={l.to} onClick={() => setIsOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border"></div>
            {session?.user ? (
              <>
                <Link
                  href={`/profile/${session.user.name?.replace(/\s+/g, "").toLocaleLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  size="sm"
                  onClick={() => signOut()}
                  className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                >
                  {t("logout")} <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  {t("login")}
                </Link>
                <Button size="lg" className="bg-[#0e9aaf]">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    {t("getStarted")}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar