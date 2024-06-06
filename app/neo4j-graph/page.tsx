"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';

const Neo4jGraph: NextPage = () => {
    const cyRef = useRef(null);
    const [query, setQuery] = useState<string | null>(null);

    useEffect(() => {
        if (query) {
            fetch('http://localhost:8000/cypher-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Fetched data:', data);
                    const cy = cytoscape({
                        container: cyRef.current,
                        elements: [...data.nodes, ...data.edges],
                        style: [
                            {
                                selector: 'node',
                                style: {
                                    'background-color': '#0074D9',
                                    'label': 'data(label)',
                                    'color': '#fff',
                                    'text-valign': 'center',
                                    'text-halign': 'center',
                                    'font-size': '10px',
                                    'width': '50px',
                                    'height': '50px',
                                    'text-wrap': 'wrap',
                                    'text-max-width': '40px',
                                    'text-outline-color': '#4682B4',
                                    'text-outline-width': '1px',
                                    'text-outline-opacity': 1,
                                },
                            },
                            {
                                selector: 'edge',
                                style: {
                                    'width': 2,
                                    'line-color': '#0074D9',
                                    'target-arrow-color': '#0074D9',
                                    'target-arrow-shape': 'triangle',
                                    'curve-style': 'bezier',
                                    'label': 'data(label)',
                                    'font-size': '8px',
                                    'color': '#0074D9',
                                    'text-rotation': 'autorotate',
                                    'text-margin-y': -10,
                                    'text-margin-x': 0,
                                },
                            },
                        ],
                        layout: {
                            name: 'cose',
                            fit: true,
                            padding: 10,
                        },
                    });
                    cy.fit(); // Ensures the graph fits within the container initially
                    console.log('Cytoscape initialized:', cy);
                })
                .catch((error) => console.error('Error fetching nodes:', error));
        }
    }, [query]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <Head>
                <title>Neo4j Graph Visualization</title>
                <meta name="description" content="Visualize Neo4j Graph with Cytoscape" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold mb-6 text-gray-800">Neo4j Graph Visualization</h1>
                <p className="text-lg text-gray-600 mb-6">Interactive visualization of a Neo4j graph database using Cytoscape.</p>
                
                <div className="mb-6">
                    <button 
                        onClick={() => setQuery(`MATCH (e1:Entity {NAME: 'Echocardiography'})-[r]->(e2:Entity {NAME: 'Pneumonia'})
                        WITH [e1, e2] AS nodes, collect(r) AS relationships
                        UNWIND nodes AS n
                        UNWIND relationships AS r
                        MATCH (n)-[r]->(m)
                        WHERE m IN nodes
                        RETURN n, r, m`)}
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                    >
                        Relationship between Echocardiography and Pneumonia
                    </button>
                    <button 
                        onClick={() => setQuery(`MATCH (n)
                        WITH n LIMIT 5
                        WITH collect(n) AS nodes
                        UNWIND nodes AS n
                        UNWIND nodes AS m
                        WITH DISTINCT n, m, nodes
                        MATCH (n)-[r]->(m)
                        WHERE m IN nodes
                        RETURN DISTINCT n, r, m`)}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Query Limit 5 Nodes
                    </button>
                </div>

                <div ref={cyRef} style={{ width: '1200px', height: '600px', backgroundColor: 'white' }} />
            </main>
        </div>
    );
};

export default Neo4jGraph;
