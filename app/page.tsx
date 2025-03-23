"use client";
import Image from "next/image";
import { useState } from "react";

const fieldsOfStudy = [
  "Computer Science",
  "Information Technology",
  "Data Science",
  "Cybersecurity",
  "AI & Machine Learning",
  "Software Engineering",
];
export default function Home() {
  const [selectedFields, setSelectedField] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-10 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="containerBox">
        <div className="title text-4xl font-bold">
          <span>Capstone Title Project Generator</span>
        </div>
        <div className="description text-lg">
          <span>A project generator for capstone titles.</span>
        </div>
      </div>
      <div className="fieldOfStudy w-full ">
        <div className="title text-2xl font-bold">
          <span>Field of Study</span>
        </div>
        <div className="description text-md flex gap-2">
          {fieldsOfStudy.map((field) => (
            <button
              key={field}
              onClick={() => setSelectedField(field)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedFields === field
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {field}
            </button>
          ))}
        </div>
        <button className="generateButton mt-4 px-4 py-2 rounded-lg border bg-blue-500 text-white border-blue-500 hover:bg-blue-600">
          Generate capstone Title 
        </button>
      </div>
    </div>
  );
}
