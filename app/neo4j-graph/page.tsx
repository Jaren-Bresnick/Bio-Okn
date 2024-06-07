"use client";
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import cytoscape from 'cytoscape';

const Neo4jGraph: React.FC = () => {
    const cyRef = useRef<HTMLDivElement>(null);
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
                    const cy = cytoscape({
                        container: cyRef.current,
                        elements: [...data.nodes, ...data.edges],
                        style: [
                            {
                                selector: 'node[size]', // Apply styles only if 'size' is defined
                                style: {
                                    'background-color': '#3B82F6',
                                    'label': 'data(label)',
                                    'color': '#ffffff',
                                    'text-valign': 'center',
                                    'text-halign': 'center',
                                    'font-size': '8px',
                                    'width': 'mapData(size, 10, 100, 30, 100)', // Dynamic size based on data
                                    'height': 'mapData(size, 10, 100, 30, 100)', // Adjusting size dynamically
                                    'border-width': '2px',
                                    'border-color': '#1E3A8A',
                                    'text-wrap': 'wrap',
                                    'text-max-width': '120px', // Increase max width for text wrapping
                                    'text-outline-width': '1px',
                                    'text-outline-color': '#3B82F6',
                                    'text-outline-opacity': 1,
                                    'shape': 'ellipse', // Adjust shape to ellipse for more text space
                                    'padding': '12px',
                                    'z-index': 10, // Ensure nodes are below edges
                                },
                            },
                            {
                                selector: 'node[!size]', // Apply styles to nodes without 'size'
                                style: {
                                    'background-color': '#3B82F6',
                                    'label': 'data(label)',
                                    'color': '#ffffff',
                                    'text-valign': 'center',
                                    'text-halign': 'center',
                                    'font-size': '8px',
                                    'width': '50px', // Default size for nodes without 'size'
                                    'height': '50px',
                                    'border-width': '2px',
                                    'border-color': '#1E3A8A',
                                    'text-wrap': 'wrap',
                                    'text-max-width': '120px', // Increase max width for text wrapping
                                    'text-outline-width': '1px',
                                    'text-outline-color': '#3B82F6',
                                    'text-outline-opacity': 1,
                                    'shape': 'ellipse', // Adjust shape to ellipse for more text space
                                    'padding': '12px',
                                    'z-index': 10, // Ensure nodes are below edges
                                },
                            },
                            {
                                selector: 'edge',
                                style: {
                                    'width': 2,
                                    'line-color': '#1E40AF',
                                    'target-arrow-color': '#1E40AF',
                                    'target-arrow-shape': 'triangle',
                                    'curve-style': 'bezier',
                                    'label': 'data(label)',
                                    'font-size': '8px',
                                    'color': '#000000',
                                    'text-rotation': 'autorotate',
                                    'text-background-opacity': 1, // Set background opacity
                                    'text-background-color': '#ffffff', // Set background color to white
                                    'text-background-shape': 'round-rectangle', // Shape of the background
                                    'source-text-margin-y': '-15px',
                                    'source-text-margin-x': '15px',
                                    'target-text-margin-y': '15px',
                                    'target-text-margin-x': '-15px',
                                    'z-index': 2000, // Ensure edges are above nodes
                                    'edge-text-rotation': 'autorotate',
                                    'text-wrap': 'wrap',
                                    
                                },
                            },
                        ],
                        layout: {
                            name: 'cose',
                            fit: true,
                            padding: 30,
                            
                            
                        },
                    });
                    cy.fit();
                })
                .catch((error) => console.error('Error fetching nodes:', error));
        }
    }, [query]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Head>
                <title>Neo4j Graph Visualization</title>
                <meta name="description" content="Visualize Neo4j Graph with Cytoscape" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center">
                <h1 className="text-5xl font-bold mb-4 text-blue-900">Neo4j Graph Visualization</h1>
                <p className="text-lg text-gray-700 mb-8">Interactive visualization of a Neo4j graph database using Cytoscape.</p>
                
                <div className="mb-8 flex space-x-4">
                    <button 
                        onClick={() => setQuery(`MATCH (e1:Entity {NAME: 'Echocardiography'})-[r]->(e2:Entity {NAME: 'Pneumonia'})
                        WITH [e1, e2] AS nodes, collect(r) AS relationships
                        UNWIND nodes AS n
                        UNWIND relationships AS r
                        MATCH (n)-[r]->(m)
                        WHERE m IN nodes
                        RETURN n, r, m`)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
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
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                    >
                        Query Limit 5 Nodes
                    </button>
                    <button 
                        onClick={() => setQuery(`MATCH (homelessness:Entity {NAME: 'Homelessness'})
                                                WITH homelessness
                                                MATCH (cause)-[r:CAUSES]->(homelessness)
                                                RETURN cause AS n, r, homelessness AS m`)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                    >
                        Causes of Homelessness
                    </button>
                </div>

                <div ref={cyRef} style={{ width: '1200px', height: '600px', backgroundColor: 'white' }} />
            </main>
        </div>
    );
};

export default Neo4jGraph;
