from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# In-memory storage for comments (you can replace this with a database)
comments = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/comments', methods=['GET'])
def get_comments():
    return jsonify(comments)

@app.route('/comments', methods=['POST'])
def add_comment():
    data = request.json
    comments.append(data)
    return jsonify(data), 201

if __name__ == '__main__':
    app.run(debug=True)
