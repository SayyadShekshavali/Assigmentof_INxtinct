"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <main
      className={`flex flex-col items-center justify-center h-screen text-center transition-colors duration-500 ${
        darkMode
          ? "bg-[radial-gradient(circle_1500px_at_50%_300px,#8b5cf6,#000000,grey)] text-white"
          : "bg-[radial-gradient(circle_950px_at_50%_300px,white,teal,black)] text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-4 animate-pulse">
        Welcome to the Mood Tracker
      </h1>

      <Link href="/mood">
        <Button className="animate-bounce transition-transform duration-700 ease-in-out shadow-2xl mb-4">
          Submit Your Mood
        </Button>
      </Link>

      <Button
        variant="outline"
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-10 right-10  "
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </Button>
    </main>
  );
}
