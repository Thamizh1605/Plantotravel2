from flask import Flask, request, jsonify
import os
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

# Load environment variables
load_dotenv()
os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# Initialize the model
llm = HuggingFaceEndpoint(
    repo_id="HuggingFaceH4/zephyr-7b-beta",
    task="text-generation",
    max_new_tokens=150,
    do_sample=False,
    repetition_penalty=1.03,
)

chat_model = ChatHuggingFace(llm=llm)

messages = [
    SystemMessage(content="You are a friendly travel assistant helping users find tourist destinations. "
                          "KKeep responses short at max your response should be 10 words and engaging. Ask one question at a time.Dont send paragraph give like a ordered list")
]

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('user_input')
    if not user_input:
        return jsonify({'error': 'User input is required'}), 400
    
    # Append user input to the message history
    messages.append(HumanMessage(content=user_input))

    # Get the AI response
    ai_msg = chat_model.invoke(messages)

    # Add the AI response to the message history
    messages.append(AIMessage(content=ai_msg.content))

    # Update the system message
    messages[0] = SystemMessage(content=f"You are a travel assistant helping a user plan their trip. "
                                        f"So far, you have discussed {len(messages) // 2} topics. "
                                        "Keep responses short at max your response should be 10 words and ask one question at a time.")

    # Return the AI's response
    return jsonify({'response': ai_msg.content})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Running on port 5001
