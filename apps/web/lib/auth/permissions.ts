import { UserRole } from "@/types/auth";

export function canManageProducts(role?: UserRole | null): boolean {
  if (!role) return false;
  return ["admin"].includes(role);
}

export function canManageOrders(role?: UserRole | null): boolean {
  if (!role) return false;
  return ["admin"].includes(role);
}

export function canManageUsers(role?: UserRole | null): boolean {
  if (!role) return false;
  return ["admin"].includes(role);
}

export function canAccessAdmin(role?: UserRole | null): boolean {
  if (!role) return false;
  return ["admin"].includes(role);
}
