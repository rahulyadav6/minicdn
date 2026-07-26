"use client";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";

export default function ThemeToggle(){
    const { theme, setTheme } = useTheme();
    return(
        <button onClick={()=> setTheme(theme === "dark" ? "light": "dark")} className="rounded-lg border p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800">
            {theme === "dark" ? <Sun size={18}/>: <Moon size={18}/> }
        </button>
    );
}