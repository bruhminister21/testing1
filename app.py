from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# In-memory database for demonstration purposes
comments_db = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/comments', methods=['GET'])
def get_comments():
    return jsonify(comments_db)

@app.route('/comments', methods=['POST'])
def add_comment():
    comment = request.json
    comments_db.append(comment)
    return jsonify({"message": "Comment added successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
