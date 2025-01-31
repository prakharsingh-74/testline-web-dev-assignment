from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load NEET college cutoff data
cutoff_data = pd.read_csv("neet_college_cutoffs.csv")

@app.route("/predict-college", methods=["POST"])
def predict_college():
    rank = int(request.json["rank"])
    eligible_colleges = cutoff_data[cutoff_data["Closing Rank"] >= rank]
    colleges = eligible_colleges["College Name"].tolist()
    return jsonify({"eligible_colleges": colleges})

if __name__ == "__main__":
    app.run(port=4001, debug=True)
