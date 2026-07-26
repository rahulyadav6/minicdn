"use client";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mountet, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mountet) {
        return (
            <button className="rounded-lg border p-2">
                <div className="h-4.5 w-4.5" />
            </button>
        )
    }
    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-lg border p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}