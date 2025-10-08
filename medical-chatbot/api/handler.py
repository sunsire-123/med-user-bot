# File: /api/handler.py

from flask import Flask, request, jsonify
import os

# This 'app' is the entry point for Vercel
app = Flask(__name__)

# This creates an API endpoint at your-vercel-url.app/api/handler
@app.route('/api/handler', methods=['POST'])
def handle_chat():
    # 1. Get the user's message from the web page
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # 2. --- YOUR CHATBOT LOGIC GOES HERE ---
    # Example: If you were using an AI service
    # api_key = os.environ.get("MY_AI_API_KEY") # Securely gets the key from Vercel
    # response_text = call_my_ai(user_message, api_key)

    # For this example, we'll just create a simple reply
    response_text = f"Your bot's response to '{user_message}' would go here."
    # ----------------------------------------

    # 3. Send the response back to the web page
    return jsonify({
        "reply": response_text
    })