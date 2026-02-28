"use client";

import Error from "next/error";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
          <h2 className="text-2xl font-bold mb-4">
            Something went wrong!
          </h2>

          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}