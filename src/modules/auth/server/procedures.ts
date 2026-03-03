import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies  } from "next/headers";
import z from "zod"
import { AUTH_COOKIE } from "../constants";
import { loginScheme, registerScheme } from "../schemes";

export const authRouter = createTRPCRouter({

    session: baseProcedure.query(async ({ctx}) => {
        const headers = await getHeaders();

        const session = await ctx.db.auth({headers});

        return session;
    }),
    logout: baseProcedure.mutation (async() => {
        const cookies = await getCookies();
        cookies.delete(AUTH_COOKIE)

        }),

    register: baseProcedure
        .input(registerScheme)
        .mutation(async ({input, ctx}) => {
            const existingData = await ctx.db.find({
                collection: "users",
                limit: 1,
                where: {
                    username: {
                        equals: input.username,
                    },
                }
            })
            const user = await ctx.db.create({
                collection: "users",
                data: {
                    email: input.email,
                    username: input.username,
                    password: input.password
                }
            });
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password
                }
            });
            if(!data.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to Login",
                });
            }
            const cookies = await getCookies();
            cookies.set({ 
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly:true,
                path: "/",
            });
        }),

        login: baseProcedure
        .input(loginScheme)
        .mutation(async ({input, ctx}) => {
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password
                }
            });
            if(!data.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to Login",
                });
            }
            const cookies = await getCookies();
            cookies.set({ 
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly:true,
                path: "/",
            });
            return data
        }),
});