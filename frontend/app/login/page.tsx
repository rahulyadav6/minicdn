"use client";

import AuthLayout from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useState } from "react";

import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "@/services/api";
import { loginSchema } from "@/schemas/loginSchema";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const result =  loginSchema.safeParse({
            email,
            password
        });
        if(!result.success){
            toast.error(result.error.issues[0].message);
            return;
        }

        try{
            const response = await axios.post(
                `${BASE_URL}/auth/login`, {email, password}
            );
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            toast.success("Login successful");
            
        }catch(error){
            console.log(error);
            toast.error("Invalid email or password");
        }   
    };

    return (
        <AuthLayout>
            <Card className="w-full max-w-md p-5">
                
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome Back 👋</CardTitle>
                    <CardDescription>Sign in to your MiniCDN account </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="h-10"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className="h-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button className="w-full cursor-pointer" type="submit">Sign in</Button>

                        <p>
                            Don't have an account?{" "}
                            <Link href="/register" className="font-medium text-primary hover:underline">Register</Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}