import Logo from "../common/logo";
import ThemeToggle from "../common/theme-toggle";

export default function AuthLayout({ children }: {children: React.ReactNode}) {
    return(
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="absolute top-6 left-6">
                <Logo/> 
            </div>
            <div className="absolute top-6 right-6"> 
                <ThemeToggle/> 
            </div>
            {children}
        </main>
    )
}