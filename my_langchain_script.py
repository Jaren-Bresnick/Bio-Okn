from langchain_openai import ChatOpenAI
from langchain_community.graphs import Neo4jGraph
from langchain.chains import GraphCypherQAChain
from langchain.prompts import PromptTemplate

llm = ChatOpenAI(
    openai_api_key="",
    model_name="gpt-4o"
)

graph = Neo4jGraph(
    url="bolt://localhost:7687",
    username="neo4j",
    password="Sdohgraph!",
)

CYPHER_GENERATION_TEMPLATE = """
Based on the given schema and the user's question, generate a Cypher query that accurately retrieves the requested information from a Neo4j graph database. 
The query should be precise, whether it's about identifying relationships, querying specific attributes, or any other type of inquiry relevant to the domain of biomedical health and SDOH. 

If user asks about the relationship between two nodes:
1. Always do allShortestPaths, never do variable length pattern matching and never apoc.algo.allShortestPath
2. Check both directions.
3. Check for multiple relationships between the nodes.


If user asks about the relationship between a node and a property:
ex: What are the causes of Homelessness?
1. Only check one direction.
2. Make sure the direction is correct, 
    ex: For "Methods of Suicide prevention", Suicide prevention should be the 2nd entity because the first entity is a method of it.


Generate the query so it returns n,r,m where n and m are nodes and r is the relationship between them.


Schema: {schema}
Question: {question}

"""


cypher_generation_prompt = PromptTemplate(
    template=CYPHER_GENERATION_TEMPLATE,
    input_variables=["schema", "question"],
)

cypher_chain = GraphCypherQAChain.from_llm(
    llm,
    graph=graph,
    cypher_prompt=cypher_generation_prompt,
    verbose=True,
    return_intermediate_steps=True
)

# cypher_chain.invoke({"query": "What is the relationship between Cocaine and Homelesssness?"})