"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const fieldsOfStudy = [
  "Computer Science",
  "Information Technology",
  "Data Science",
  "Cybersecurity",
  "AI & Machine Learning",
  "Software Engineering",
  "Medicine",
  "Engineering",
  "Business",
  "Finance",
  "Marketing",
  "Design",
  "Architecture",
];
const difficultyMap = ["Easy", "Medium", "Hard"];

interface CapstoneDetails {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
}

const difficultyCSS: Record<string, string> = {
  Easy: "bg-green-600 border-green-500 text-white",
  Medium: "bg-yellow-500 border-yellow-500",
  Hard: "bg-red-700 border-red-700 text-white",
};
export default function Home() {
  const [selectedFields, setSelectedField] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [capstoneDetails, setCapstoneDetails] =
    useState<CapstoneDetails | null>(null);

  const generationHandler = async () => {
    if (!selectedFields) return;

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field: selectedFields }),
    });

    const data = await response.json();
    const dataresult = data.result;

    const jsonString = dataresult?.replace(/```json|```/g, "").trim();

    const formattedResponse = JSON.parse(jsonString);

    setCapstoneDetails(formattedResponse);
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen h-screen p-5 pb-5 font-[family-name:var(--font-geist-sans)]">
      <div className="containerBox pb-5">
        <div className="title text-4xl font-bold">
          <span>Capstone Title Project Generator</span>
        </div>
        <div className="description text-md ml-4">
          <span>A project generator for capstone titles.</span>
        </div>
      </div>
      <div className="content w-full grid grid-cols-[1fr_30em] gap-2 h-full items-center justify-center">
        <div className="fieldSelections h-full flex flex-col justify-between">
          <div className="selectiveBox grid grid-cols-1 gap-5 w-full">
            <div className="fieldOfStudy flex flex-col w-full">
              <div className="title text-xl font-bold">
                <span>Industry</span>
              </div>
              <div className="text-sm grid grid-cols-6 gap-1 w-full">
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
            </div>
            <div className="difficultyGrp flex w-full">
              <div className="title text-xl font-bold">
                <span>Difficulty</span>
              </div>
              <div className="description text-md flex gap-2 w-full ml-25">
                {difficultyMap.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      difficulty === diff
                        ? difficultyCSS[diff]
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="generateBottonGrp w-full flex justify-center pb-5">
            <button
              className={`generateButton mt-2 px-4 py-2 rounded-lg border ${
                selectedFields
                  ? " bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                  : "text-white bg-slate-300 border-slate-300"
              }`}
              onClick={generationHandler}
              disabled={!selectedFields}
            >
              Generate capstone Title
            </button>
          </div>
        </div>
        <div className="generatedDetails w-full h-full flex items-center justify-center">
        <div className="capstoneDetails flex flex-col border border-solid border-slate-300 bg-white p-5 rounded-lg w-full h-full shadow-lg">
          <div className="detailContent flex h-full flex-col">
            {capstoneDetails ? (
              <>
                <div className="title text-md text-center font-bold">
                  <span>{capstoneDetails.title}</span>
                </div>
                <div className="divider border border-slate-300/50 my-3"></div>
                <div className="row grid grid-cols-2 gap-2">
                  <div className="difficulty text-md">
                    <span
                      className={`rounded-lg border p-1 ml-2 text-sm ${
                        capstoneDetails?.difficulty
                          ? difficultyCSS[capstoneDetails?.difficulty]
                          : "bg-slate-500"
                      }`}
                    >
                      {capstoneDetails.difficulty}
                    </span>
                  </div>
                  <div className="estimation text-md">
                    <span className="text-slate-400 text-md">Estimation:</span>
                    <span className="ml-3">{capstoneDetails.duration}</span>
                  </div>
                </div>
                <div className="description text-md mt-5">
                  <span className="text-slate-500 text-md">Description:</span>
                  <p className="text-md">{capstoneDetails.description}</p>
                </div>
              </>
            ) : (
              <div className="placeholder text-md text-center flex flex-col items-center justify-center text-slate-400">
                <span>Generate a capstone title to see details</span>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
      <div className="footer pt-5">
        <p className="text-xs">
          any suggestions or recommendations ? Feel free to email me at
          <span className="font-bold"> joshuasoqueno21@gmail.com</span>
        </p>
        <div className="contacts flex justify-center gap-1 pt-5">
          <div className="facebook">fb</div>
          <div className="insta">ig</div>
          <div className="linkedIn">In</div>
        </div>
      </div>
    </div>
  );
}
