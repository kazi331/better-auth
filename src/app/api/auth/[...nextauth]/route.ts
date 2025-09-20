import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;

// Add optional Middleware to keep the session alive, this will update the session expiry every time its called.

export { auth as middleware } from "@/lib/auth";
