"use client";

import Head from "next/head";

export default function Page() {
  const handleTestError = async () => {
    try {
      const res = await fetch("/api/test-api");

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      alert("API working correctly!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Check console.");
    }
  };

  return (
    <div>
      <Head>
        <title>Next.js App</title>
        <meta
          name="description"
          content="Next.js + FastAPI Production App"
        />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0f172a",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Next.js Application
        </h1>

        <p style={{ marginBottom: "20px" }}>
          Your app is running without Sentry.
        </p>

        <button
          type="button"
          style={{
            padding: "12px 20px",
            cursor: "pointer",
            backgroundColor: "#7c3aed",
            borderRadius: "6px",
            border: "none",
            color: "white",
            fontSize: "14px",
          }}
          onClick={handleTestError}
        >
          Test API Call
        </button>

        <p style={{ marginTop: "24px", opacity: 0.7 }}>
          Clean setup — no Sentry integration.
        </p>
      </main>
    </div>
  );
}