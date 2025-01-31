from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load pre-trained rank prediction model
model = pickle.load(open("rank_model.pkl", "rb"))

@app.route("/predict-rank", methods=["POST"])
def predict_rank():
    data = request.json["quizzes"]
    features = np.array([sum(q["score"] for q in data)]).reshape(1, -1)
    predicted_rank = model.predict(features)[0]
    return jsonify({"predicted_rank": int(predicted_rank)})

if __name__ == "__main__":
    app.run(port=4000, debug=True)
