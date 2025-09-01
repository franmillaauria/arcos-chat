// src/lib/session.ts
export function getSessionId(): string {
  if (typeof window === "undefined") return "sess_server";
  let id = sessionStorage.getItem("sessionId");
  if (!id) {
    const rand = (globalThis.crypto?.randomUUID?.() ??
      Math.random().toString(36).slice(2, 10));
    id = "sess_" + rand;
    sessionStorage.setItem("sessionId", id);
  }
  return id;
}

export function getCurrentUrl(): string | null {
  if (typeof window === "undefined") return null;
  return window.location.href;
}

export function getSessionMeta() {
  return { sessionId: getSessionId(), currentUrl: getCurrentUrl() };
}
