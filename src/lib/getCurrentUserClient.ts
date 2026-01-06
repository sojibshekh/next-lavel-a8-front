export async function getCurrentUserClient() {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null; // user object
  } catch (err) {
    return null;
  }
}
