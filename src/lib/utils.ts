import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//class name.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantURL(tenantSlug: string) {
  return `/tenants/${tenantSlug}`
}

