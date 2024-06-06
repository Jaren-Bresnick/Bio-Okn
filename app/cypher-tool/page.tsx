// app/cypher-tool/page.tsx
"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

const CypherTool: NextPage = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/cypher-query", requestOptions);
      if (response.ok) {
        const data = await response.json();
        setResult(JSON.stringify(data, null, 2));
      } else {
        const errorText = await response.text();
        setResult(`Failed to fetch the result: ${errorText}`);
      }
    } catch (error) {
      setResult(`An error occurred while fetching the result: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Head>
        <title>Cypher Tool</title>
        <meta name="description" content="Convert natural language to Cypher query" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-6 text-gray-800">
          Natural Language {'->'} Cypher Query
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md" method="post">
          <input
            type="text"
            placeholder="Enter your question..."
            className="p-4 w-full text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
            className="mt-4 w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        <div className="mt-6 w-full max-w-2xl">
          <p className="text-lg text-gray-800">Result:</p>
          <div className="mt-2 p-4 bg-white border rounded-md shadow-md">
            <pre className="text-left whitespace-pre-wrap">{result ? result : "No results yet..."}</pre>
          </div>
        </div>

        <div className="mt-6 w-full max-w-2xl">
          <Link href="/neo4j-graph" legacyBehavior>
            <a className="text-blue-600 hover:underline">Neo4j Graph</a>
          </Link>
        </div>
      </main>

    </div>
  );
};

export default CypherTool;
