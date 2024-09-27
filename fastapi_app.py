from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase
import logging
from my_langchain_script import cypher_chain

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Neo4j setup
neo4j_url = "bolt://localhost:7687"
neo4j_username = "neo4j"
neo4j_password = "Sdohgraph!"

driver = GraphDatabase.driver(neo4j_url, auth=(neo4j_username, neo4j_password))

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Neo4j setup
neo4j_url = "bolt://localhost:7687"
neo4j_username = "neo4j"
neo4j_password = "Sdohgraph!"

driver = GraphDatabase.driver(neo4j_url, auth=(neo4j_username, neo4j_password))

# Load semtypes.txt into a dictionary
semtypes_dict = {}
with open("semtypes.txt") as file:
    for line in file:
        parts = line.strip().split('|')
        if len(parts) == 3:
            semtypes_dict[parts[0]] = parts[2]  

@app.post("/cypher-query")
async def get_cypher_query(request: Request):
    data = await request.json()
    query = data.get('query', '')

    with driver.session() as session:
        result = session.run(query)
        nodes = {}
        edges = []
        semtypes = {}

        for record in result:
            n = record['n']
            m = record['m']
            relationships = record['r']

            n_id = str(n.id)
            m_id = str(m.id)
            n_semtype = n.get('SEMTYPE', 'Unknown')
            m_semtype = m.get('SEMTYPE', 'Unknown')

            if n_id not in nodes:
                nodes[n_id] = {
                    "data": {
                        "id": n_id,
                        "label": n.get('NAME', 'Unknown'),
                        "semtype": n_semtype
                    }
                }
                # Extract parts and map them
                for part in n_semtype.split('_'):
                    semtypes[part] = semtypes_dict.get(part, part)

            if m_id not in nodes:
                nodes[m_id] = {
                    "data": {
                        "id": m_id,
                        "label": m.get('NAME', 'Unknown'),
                        "semtype": m_semtype
                    }
                }
                # Extract parts and map them
                for part in m_semtype.split('_'):
                    semtypes[part] = semtypes_dict.get(part, part)

            # Handle relationships
            if isinstance(relationships, list):
                for rel in relationships:
                    edges.append({"data": {"source": n_id, "target": m_id, "label": rel.type}})
            else:
                edges.append({"data": {"source": n_id, "target": m_id, "label": relationships.type}})

        return JSONResponse(content={"nodes": list(nodes.values()), "edges": edges, "semtype_labels": semtypes})



    
@app.post("/cypher-querying")
async def get_cypher_querying(request: Request):
    try:
        data = await request.json()
        if not data or 'query' not in data:
            logging.debug("Invalid request received.")
            return JSONResponse(content={'error': 'Invalid request'}, status_code=400)

        query = data['query']
        result = cypher_chain.invoke({"query": query})

        intermediate_steps = result["intermediate_steps"]
        generated_query = None
        for step in intermediate_steps:
            if 'query' in step:
                generated_query = step['query']
                break
        if generated_query:
            generated_query = generated_query.replace("cypher\n", "").strip()
            print(generated_query)  

            return JSONResponse(content={"result": result["result"], "query": generated_query})
        else:
            return JSONResponse(content={'error': 'Failed to generate Cypher query'}, status_code=500)
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return JSONResponse(content={'error': str(e)}, status_code=500)
    
@app.get("/nodes")
async def get_nodes(query: str):
    try:
        with driver.session() as session:
            result = session.run(
                """
                MATCH (n)
                WHERE toLower(n.NAME) CONTAINS toLower($query)
                RETURN n.NAME AS name
                LIMIT 10
                """, {"query": query}
            )
            nodes = [{"label": record["name"]} for record in result]
        return JSONResponse(content=nodes)
    except Exception as e:
        logging.error(f"An error occurred while fetching nodes: {e}")
        return JSONResponse(content={'error': str(e)}, status_code=500)
    
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
