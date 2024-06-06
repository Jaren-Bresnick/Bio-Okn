from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

app = FastAPI()

# Allow CORS for the frontend running on localhost:3000
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
            r = record['r']
            n_id = str(n.id)
            m_id = str(m.id)
            if n_id not in nodes:
                nodes[n_id] = {"data": {"id": n_id, "label": n.get('NAME', 'Unknown')}}
            if m_id not in nodes:
                nodes[m_id] = {"data": {"id": m_id, "label": m.get('NAME', 'Unknown')}}
            edges.append({"data": {"source": n_id, "target": m_id, "label": r.type}})
        return JSONResponse(content={"nodes": list(nodes.values()), "edges": edges})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
