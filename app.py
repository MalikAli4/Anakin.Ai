from flask import Flask, request, jsonify, send_from_directory
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__, static_folder="static")

@app.route("/")
def serve_index():
    return send_from_directory("static", "index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # use "gpt-4" if you have access
            messages=[
                {"role": "system", "content": "You are Anakin, an AI assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return jsonify({"response": response.choices[0].message.content.strip()})
    except Exception as e:
        print(f"🔥 OpenAI error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
