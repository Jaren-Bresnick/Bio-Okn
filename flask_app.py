from flask import Flask, request, jsonify
from my_langchain_script import cypher_chain
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/cypher-query": {"origins": "http://localhost:3000"}})

@app.route('/cypher-query', methods=['POST'])
def get_cypher_query():
    print("Headers:", request.headers)
    print("Data:", request.data)  # Raw data, useful for debugging
    data = request.get_json()
    
    # Check if data is None or query key is missing
    if not data or 'query' not in data:
        print("Invalid request received.")
        return jsonify({'error': 'Invalid request'}), 400

    query = data['query']
    print("Processing query:", query)
    
    return jsonify(cypher_chain.invoke({"query": query}))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
