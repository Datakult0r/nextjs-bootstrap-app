"use client";

export function GameButton() {
  return (
    <div className="container mx-auto my-8 flex justify-center">
      <a 
        href="/overview.html" 
        className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-blue-700"
      >
        View Gamefiction Commands
      </a>
    </div>
  );
}