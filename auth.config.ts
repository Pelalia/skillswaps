import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/login",
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) { 
            const isLoggedIn = !!auth?.user;
            const isProtected = nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/profile") || nextUrl.pathname.startsWith("/requests");
            if (isProtected && !isLoggedIn) {
                return false;
            }
            return true
        }
    },
    providers: []
}