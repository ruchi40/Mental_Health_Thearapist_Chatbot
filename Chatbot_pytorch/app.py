from flask import Flask, request, jsonify
import subprocess
import json

app = Flask(__name__)

# Load intents from JSON file
with open('Chatbot_pytorch/mentalhealth.json', 'r') as file:
    intents = json.load(file)

# Define route to handle chat messages
@app.route("/chat", methods=["POST"])
def chat():
    # Extract user message from request data
    user_message = request.json["message"]

    # Call the chat.py script and pass the user's message as an argument
    process = subprocess.Popen(["python", "Chatbot_pytorch/chat.py", user_message], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    output, _ = process.communicate()

    # Extract bot's response from the output
    bot_response = output.strip()

    # Return bot's response as JSON
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
