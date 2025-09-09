export function getInitials(name?: string, email?: string) {
  const source = (name && name.trim()) || email || "";
  if (!source) return "NA";
  if (!name) return (email || "").slice(0, 2).toUpperCase();
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "NA";
}