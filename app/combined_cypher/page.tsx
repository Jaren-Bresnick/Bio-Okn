'use client';
import React, { useEffect, useRef, useState, FormEvent } from 'react';
import Head from 'next/head';
import cytoscape from 'cytoscape';
import { FaExpand } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

const CypherTool: React.FC = () => {
    const cyRef = useRef<HTMLDivElement>(null);
    const modalCyRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState('');
    const [query, setQuery] = useState<string | null>(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nodes, setNodes] = useState<any[]>([]);
    const [cyInstance, setCyInstance] = useState<any>(null);
    const [modalCyInstance, setModalCyInstance] = useState<any>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: input }),
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/cypher-querying", requestOptions);
            if (response.ok) {
                const data = await response.json();
                let resultString = JSON.stringify(data.result, null, 2);
                resultString = resultString.replace(/^"|"$/g, ''); 
                setResult(resultString);
                setQuery(data.query);  
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

    const capitalizeWords = (string: string) => {
        return string.replace(/\b\w/g, char => char.toUpperCase());
    };

    const initializeGraph = (container: HTMLElement | null, data: any, setNodeList = false) => {
        if (container) {
            const formattedData = {
                nodes: data.nodes.map((node: any) => ({
                    ...node,
                    data: {
                        ...node.data,
                        label: capitalizeWords(node.data.label)
                    }
                })),
                edges: data.edges
            };

            const cy = cytoscape({
                container,
                elements: [...formattedData.nodes, ...formattedData.edges],
                style: [
                    {
                        selector: 'node[size]',
                        style: {
                            'background-color': '#3B82F6',
                            'label': 'data(label)',
                            'color': '#ffffff',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'font-size': '8px',
                            'width': 'mapData(size, 10, 100, 30, 100)',
                            'height': 'mapData(size, 10, 100, 30, 100)',
                            'border-width': '2px',
                            'border-color': '#1E3A8A',
                            'text-wrap': 'wrap',
                            'text-max-width': '120px',
                            'text-outline-width': '1px',
                            'text-outline-color': '#3B82F6',
                            'text-outline-opacity': 1,
                            'shape': 'ellipse',
                            'padding': '12px',
                            'z-index': 10,
                        },
                    },
                    {
                        selector: 'node[!size]',
                        style: {
                            'background-color': '#3B82F6',
                            'label': 'data(label)',
                            'color': '#ffffff',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'font-size': '8px',
                            'width': '50px',
                            'height': '50px',
                            'border-width': '2px',
                            'border-color': '#1E3A8A',
                            'text-wrap': 'wrap',
                            'text-max-width': '120px',
                            'text-outline-width': '1px',
                            'text-outline-color': '#3B82F6',
                            'text-outline-opacity': 1,
                            'shape': 'ellipse',
                            'padding': '12px',
                            'z-index': 10,
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
                            'text-background-opacity': 1,
                            'text-background-color': '#ffffff',
                            'text-background-shape': 'round-rectangle',
                            'source-text-margin-y': '-15px',
                            'source-text-margin-x': '15px',
                            'target-text-margin-y': '15px',
                            'target-text-margin-x': '-15px',
                            'z-index': 2000,
                            'edge-text-rotation': 'autorotate',
                            'text-wrap': 'wrap',
                        },
                    },
                    {
                        selector: '.highlighted',
                        style: {
                            'background-color': '#D4AF37',
                            'text-outline-color': '#D4AF37',
                        },
                    },
                ],
                layout: {
                    name: 'cose',
                    fit: true,
                    padding: 30,
                },
            });

            if (setNodeList) {
                setNodes(formattedData.nodes.map((node: any) => node.data));
            }

            cy.fit();
            setCyInstance(cy);

            if (container === modalCyRef.current) {
                setModalCyInstance(cy);
            }
        }
    };

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
                    initializeGraph(cyRef.current, data);
                })
                .catch((error) => console.error('Error fetching nodes:', error))
                .finally(() => setLoading(false));
        }
    }, [query]);

    useEffect(() => {
        if (isModalOpen && query) {
            fetch('http://localhost:8000/cypher-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            })
                .then((response) => response.json())
                .then((data) => {
                    initializeGraph(modalCyRef.current, data, true);
                })
                .catch((error) => console.error('Error fetching nodes:', error));
        }
    }, [isModalOpen, query]);

    const highlightNode = (nodeId: string) => {
        if (cyInstance) {
            cyInstance.nodes().removeClass('highlighted');
            const node = cyInstance.getElementById(nodeId);
            if (node) {
                node.addClass('highlighted');
            }
        }
    };

    const saveGraphAsPNG = () => {
        if (modalCyInstance) {
            const pngData = modalCyInstance.png({
                full: true,
                scale: 2,
                bg: 'white' 
            });
            const link = document.createElement('a');
            link.href = pngData;
            link.download = 'graph.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <Head>
                <title>Cypher Tool</title>
                <meta name="description" content="Convert natural language to Cypher query and visualize the Neo4j graph" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">
                    Natural Language to Cypher Query and Visualization
                </h1>

                <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white p-6 rounded-md shadow-md space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex flex-col items-center w-full md:w-1/2 p-4">
                        <form onSubmit={handleSubmit} className="w-full">
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

                        <div className="mt-6 w-full">
                            <p className="text-lg text-gray-800">Result:</p>
                            <div className="mt-2 p-4 bg-gray-100 border rounded-md shadow-inner text-left">
                                <pre className="whitespace-pre-wrap">{result ? result : "No results yet..."}</pre>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full md:w-1/2 p-4 relative">
                        <h2 className="text-3xl font-bold mb-4 text-blue-900">Sample Queries</h2>
                        <div className="mb-4 flex flex-wrap justify-center space-x-2">
                            <button 
                                onClick={() => setQuery(`MATCH (n:Entity)-[r:METHOD_OF]->(m:Entity {NAME: 'Suicide prevention'})
                                                    RETURN n, r, m`)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 m-2"
                            >
                                Methods of Suicide Prevention
                            </button>
                            <button 
                                onClick={() => setQuery(`MATCH (n:Entity)-[r:PREVENTS]->(m:Entity {NAME: 'Post-Traumatic Stress Disorder'})
                                                    RETURN n, r, m
                                                    LIMIT 4`)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 m-2"
                            >
                                Preventions of PTSD
                            </button>
                            <button 
                                onClick={() => setQuery(`MATCH (n:Entity)-[r:CAUSES]->(m:Entity {NAME: 'Homelessness'})
                                                    RETURN n, r, m`)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 m-2"
                            >
                                Causes of Homelessness
                            </button>
                        </div>

                        <div className="relative w-full h-96 bg-white rounded-md shadow-md">
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                                </div>
                            )}
                            <div ref={cyRef} className="w-full h-full" />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="absolute top-2 right-2 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out z-10"
                            >
                                <FaExpand />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 h-5/6 flex">
                        <div className="w-1/4 h-full overflow-auto bg-gray-200 rounded-l-lg p-4">
                            <h3 className="text-xl font-bold mb-4">Nodes</h3>
                            <ul>
                                {nodes.map((node, index) => (
                                    <li
                                        key={index}
                                        className="mb-2 cursor-pointer hover:underline"
                                        onClick={() => highlightNode(node.id)}
                                    >
                                        {node.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-3/4 h-full relative">
                            <div className="absolute top-2 right-2 z-10">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
                                >
                                    Close
                                </button>
                            </div>
                            <div ref={modalCyRef} className="w-full h-full bg-white rounded-r-lg shadow-md" />
                            <button
                                onClick={saveGraphAsPNG}
                                className="absolute bottom-2 right-2 p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out z-10"
                            >
                                <FiDownload />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CypherTool;
