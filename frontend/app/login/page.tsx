import AuthLayout from "@/components/layout/auth-layout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage(){
    return (
        <AuthLayout>
            <Card className="w-full max-w-md p-5">
                
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome Back 👋</CardTitle>
                    <CardDescription>Sign in to your MiniCDN account </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <form className="space-y-5">

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="....."
                            />
                        </div>

                        <Button className="w-full cursor-pointer">Sign in</Button>

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