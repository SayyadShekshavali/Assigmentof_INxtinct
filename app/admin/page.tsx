"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type MoodEntry = {
  name: string;
  mood: string;
  comment: string;
  time: string;
};

export default function AdminPage() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchMoods = async () => {
      const res = await fetch("/api/mood");
      const data = await res.json();
      setMoods(data);
    };
    fetchMoods();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main
      className={`h-screen w-screen flex flex-col items-center justify-start p-4 transition-colors duration-500 ${
        darkMode
          ? "bg-[radial-gradient(circle_900px_at_50%_300px,white,black)] text-white"
          : "bg-[radial-gradient(circle_950px_at_50%_300px,white,teal,black)] text-black"
      }`}
    >
      <Button
        variant="outline"
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </Button>

      <h1 className="text-3xl font-bold mb-6 text-center animate-pulse">
        Admin Dashboard
      </h1>

      {moods.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-300">No data submitted</p>
      ) : (
        <div className="w-full max-w-5xl overflow-x-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg bg-white dark:bg-zinc-900">
          <Table className="w-full text-left">
            <TableHeader className="bg-gray-100 dark:bg-zinc-800">
              <TableRow>
                <TableHead className="px-4 py-2">Name</TableHead>
                <TableHead className="px-4 py-2">Mood</TableHead>
                <TableHead className="px-4 py-2">Comment</TableHead>
                <TableHead className="px-4 py-2">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moods.map((entry, index) => (
                <TableRow
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-zinc-900"
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                  }
                >
                  <TableCell className="px-4 py-2">
                    {entry.name || "-"}
                  </TableCell>
                  <TableCell className="px-4 py-2">{entry.mood}</TableCell>
                  <TableCell className="px-4 py-2">{entry.comment}</TableCell>
                  <TableCell className="px-4 py-2">
                    {new Date(entry.time).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}
