"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

function Page() {
  const [mood, setMood] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ mood, comment, name }),
    });
    if (res.ok) {
      alert("Mood submitted!");
      setMood("");
      setComment("");
      setName("");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <main
      className={`flex flex-col items-center justify-center h-screen text-center transition-colors duration-500 px-4 ${
        darkMode
          ? "bg-[radial-gradient(circle_900px_at_50%_300px,gray,white)] text-white"
          : "bg-[radial-gradient(circle_1000px_at_50%_300px,white,teal,black)] text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 animate-pulse">
        How are you feeling today?
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="h-10 w-60 border border-black rounded-xl p-2 ml-2 text-black"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mention your Name/Role"
          />
        </div>

        <RadioGroup value={mood} onValueChange={setMood} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="happy" id="happy" />
            <Label htmlFor="happy">😊 Happy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="neutral" id="neutral" />
            <Label htmlFor="neutral">😐 Neutral</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sad" id="sad" />
            <Label htmlFor="sad">😞 Sad</Label>
          </div>
        </RadioGroup>

        <div>
          <Label htmlFor="comment" className="block mb-2">
            Optional Comment
          </Label>
          <Textarea
            className="w-90 h-24"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Anything you'd like to share?"
          />
        </div>

        <Button className="mt-6 shadow-lg " type="submit">
          Submit
        </Button>
      </form>

      <Button
        variant="outline"
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-10 right-10"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </Button>
    </main>
  );
}

export default Page;
