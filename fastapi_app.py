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

@app.post("/cypher-query")
async def get_cypher_query(request: Request):
    data = await request.json()
    
    if not data or 'query' not in data:
        return JSONResponse(content={'error': 'Invalid request'}, status_code=400)

    query = data['query']
    with driver.session() as session:
        result = session.run(query)
        nodes = {}
        edges = []
        for record in result:
            n = record['n']
            m = record['m']
            relationships = record['r']
            n_id = str(n.id)
            m_id = str(m.id)
            if n_id not in nodes:
                nodes[n_id] = {"data": {"id": n_id, "label": n.get('NAME', 'Unknown')}}
            if m_id not in nodes:
                nodes[m_id] = {"data": {"id": m_id, "label": m.get('NAME', 'Unknown')}}

            if isinstance(relationships, list):  # Handle list of relationships
                for rel in relationships:
                    if isinstance(rel, tuple):
                        relationship_type = rel[1]
                        source_id = str(rel[0].id)
                        target_id = str(rel[2].id)
                    else:
                        relationship_type = rel.type
                        source_id = str(rel.start_node.id)
                        target_id = str(rel.end_node.id)
                    edges.append({"data": {"source": source_id, "target": target_id, "label": relationship_type}})
            else:  # Handle single relationship
                if isinstance(relationships, tuple):
                    relationship_type = relationships[1]
                    source_id = str(relationships[0].id)
                    target_id = str(relationships[2].id)
                else:
                    relationship_type = relationships.type
                    source_id = str(relationships.start_node.id)
                    target_id = str(relationships.end_node.id)
                edges.append({"data": {"source": source_id, "target": target_id, "label": relationship_type}})
                
        return JSONResponse(content={"nodes": list(nodes.values()), "edges": edges})
    
    
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
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
