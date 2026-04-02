import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def chat():
    print("HR Assistant Chatbot (type 'exit' to quit)\n")

    while True:
        user_input = input("You: ")

        if user_input.lower() == "exit":
            print("Session ended.")
            break

        response = model.generate_content(user_input)

        print("Bot:", response.text)
        print()


if __name__ == "__main__":
    chat()
