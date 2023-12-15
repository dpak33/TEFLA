import requests
import os

# Directly get the API key
chat_api_key = "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"


def generate_quiz_questions(user_level, topic):
    # ChatGPT endpoint
    api_url = "https://api.openai.com/v1/chat/completions"

    # Construct the message for ChatGPT
    message = f"Assuming that the user is a {user_level} language learner, please generate 20 grammar and vocabulary " \
              f"tests on the topic of {topic}, as well as two more open-ended short-response questions."

    # Construct the API request data
    data = {
        "model": "gpt-3.5-turbo",  # Specify the model
        "messages": [{"role": "system", "content": message}],
        "temperature": 0.7  # Adjust for creativity
    }

    # Headers for the API request
    headers = {
        "Authorization": f"Bearer {chat_api_key}",
        "Content-Type": "application/json"
    }

    # Send the request to the ChatGPT API
    response = requests.post(api_url, json=data, headers=headers)

    # Handle the response
    if response.status_code == 200:
        response_data = response.json()
        return response_data
    else:
        print(f"Error: {response.status_code}, Reason: {response.reason}")
        if response.headers.get('Content-Type') == 'application/json':
            try:
                error_data = response.json()
                print("Error details:", error_data)
            except ValueError:
                print("Response is not in JSON format.")
        else:
            print("Response:", response.text)
        return None

# Example usage
user_level = "beginner"
topic = "travel"
quiz_questions = generate_quiz_questions(user_level, topic)
print(quiz_questions)