import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import db from "../drizzle/db.js";
import * as schema from "../drizzle/schema.js";
import { buildMagicLinkEmail } from "../email/magic-link.js";

const crosDomains = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(",")
    : ["http://localhost:5173", "http://localhost:3000","http://localhost:3001", "null", "file://"];

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
const appName = process.env.APP_NAME || "Clawpilot";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Ensure frontend URL is always in trusted origins
const trustedOrigins = [...new Set([...crosDomains, frontendURL])]
    .map((origin) => origin.trim())
    .filter(Boolean);

console.log("CORS Allowed Origins for Auth:", trustedOrigins);
export const auth = betterAuth({
    basePath: "/api/v1/auth", // Match your Express routing structure
    trustedOrigins: trustedOrigins,
    baseURL: process.env.BETTER_AUTH_URL, // Backend URL
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        apple: {
            clientId: process.env.APPLE_CLIENT_ID as string,
            clientSecret: process.env.APPLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                if (!resend) {
                    throw new Error("RESEND_API_KEY is not set");
                }
                if (!resendFrom) {
                    throw new Error("RESEND_FROM is not set");
                }

                const { subject, html, text } = await buildMagicLinkEmail({
                    appName,
                    url,
                });

                console.log(`Sending magic link email to ${email}`);
                const response = await resend.emails.send({
                    from: resendFrom,
                    to: email,
                    subject,
                    html,
                    text,
                });
                console.log("Resend response", response);
            },
        }),
    ],
    advanced: {
        defaultCookieAttributes: {
            sameSite: "lax",
            secure: false, // Set to true in production with HTTPS
        },
        crossSubDomainCookies: {
            enabled: false,
        },
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    },
    callbacks: {
        redirect: {
            afterSignIn: frontendURL,
            afterSignUp: frontendURL,
            afterSignOut: frontendURL,
        },
    },
});
