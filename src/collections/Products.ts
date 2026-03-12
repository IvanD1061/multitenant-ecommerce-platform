import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";
import { relationship } from "payload/shared";
import { boolean } from "zod";

export const Products: CollectionConfig = {
    slug: "products",
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true;
            const tenant = req.user?.tenants?.[0]?.tenant as Tenant

            return Boolean(tenant?.stripeDetailsSubmitted)
        }
    },

    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            //TODO
            type: "text",
        },
        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                description: "In USD"
            }
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: false,
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "refundPolicy",
            type: "select",
            options: ["30 days", "15 days", "10 days", "5 days", " 1 day", "no-refunds"],
            defaultValue: "30 days",
        },
        {
            name: "content",
            type: "textarea",
            admin: {
                description:
                    "Protected Content oly visable to customrers after purchase. Add product documentation, downloadable files, getting started guides, and bonus materials. Supports Markdown formatting"
            }
        }
    ],
}