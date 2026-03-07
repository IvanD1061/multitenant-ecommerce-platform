"use client"
import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {toast} from "sonner";
import {zodResolver} from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
import z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { loginScheme } from "../../schemes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],

});

export const SignInView = () => {

    const router = useRouter();

    const trpc = useTRPC();
    const QueryClient = useQueryClient();

    const login = useMutation(trpc.auth.login.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            await QueryClient.invalidateQueries(trpc.auth.session.queryFilter())
            router.push("/")
        }
    }));

    const form = useForm<z.infer<typeof loginScheme>>({
        mode :"all",
        resolver: zodResolver(loginScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginScheme>) =>{
        login.mutate(values)
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[]#F4F4F4] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form
                        onSubmit = {form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8 p-4 lg:p-16"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <Link href = "/">
                                <span className={cn("text-2xl font-semibold", poppins.className)}>
                                    TheMarketPlace
                                </span>
                            </Link>
                            <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-base border-none underline"
                            >
                                <Link prefetch href = "/sign-up">
                                    Sign up
                                </Link>
                            </Button>
                        </div>
                        <h1 className=" text-4xl font-medium">
                            Welcome back to TheMarketPlace!
                        </h1>
                        <FormField
                            name = "email"
                            render= {({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                   
                                    <FormMessage/>
                                </FormItem>
                            )}
                        
                        />
                         <FormField
                            name = "password"
                            render= {({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type = "password"/>
                                    </FormControl>
                                   
                                    <FormMessage/>
                                </FormItem>
                            )}
                        
                        />
                        <Button
                        disabled={login.isPending}
                        type = "submit"
                        size="lg"
                        variant="elevated"
                        className="bg-black text-white hover:bg-orange-400 hover:text-primary"

                        >
                            login in
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="h-screen w-full lg:col-span-2 hidden lg:block"
            style={{
                backgroundImage: "url('/bg-tiger.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            />
            </div>
    )
}