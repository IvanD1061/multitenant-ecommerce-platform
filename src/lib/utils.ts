import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//class name.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantURL(tenantSlug: string) {
  const isDevelopment = process.env.NODE_ENV === "development"
  const isSubdomainRoutingEnabled = Boolean(process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING!);


  // this check if we are in development mode 
  if (isDevelopment || !isSubdomainRoutingEnabled) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;

  }

  const protocol = "https"
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!

  return `${protocol}://${tenantSlug}.${domain}`
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value))
}

