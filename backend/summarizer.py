import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env in current directory
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# git add main.py && curl -X POST "http://127.0.0.1:8080/generate" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"repo_path\": \".\"}"

def summarize_diff(diff_text):
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"""
    You are an AI code assistant that writes helpful Git commit messages and PR descriptions.

    Analyze this git diff and generate:
    1. A **concise commit message** (under 80 chars)
    2. A **clear PR description** with sections:
       - Summary
       - Changes Made
       - Impact

    Diff:
    {diff_text}
    """

    response = model.generate_content(prompt)
    return response.text.strip()
