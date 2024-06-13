import React from 'react';
import CypherTool from '../cypher-tool/page';
import Neo4jGraph from '../neo4j-graph/page';

const CypherGraphLayout: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:w-2/5 w-full p-4 bg-gray-50 overflow-auto">
                <CypherTool />
            </div>
            <div className="md:w-3/5 w-full p-4 bg-gray-100 overflow-auto">
                <Neo4jGraph />
            </div>
        </div>
    );
};

export default CypherGraphLayout;
