from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import google.generativeai as genai
import os
import traceback

app = FastAPI(title="AI Commit Message & PR Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# This is for testing purposes only. In production, use a more secure method to handle API keys.

class RepoRequest(BaseModel):
    repo_path: str  # 👈 folder path provided from frontend

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@app.post("/generate")
async def generate_commit_message(repo: RepoRequest):
    try:
        if not os.path.exists(repo.repo_path):
            return {"error": f"Path '{repo.repo_path}' not found."}

        # Run git diff --staged in that folder
        diff = subprocess.check_output(
            ["git", "diff", "--staged"], cwd=repo.repo_path, stderr=subprocess.STDOUT
        ).decode("utf-8")

        if not diff.strip():
            return {"result": f"No staged changes found in {repo.repo_path}."}

        model = genai.GenerativeModel("gemini-2.0-flash")
        prompt = f"Generate a clear commit message and PR description for the following git diff:\n\n{diff}"
        response = model.generate_content(prompt)

        return {"repo": repo.repo_path, "result": response.text}

    except subprocess.CalledProcessError as e:
        return {
            "error": "Error running git diff. Make sure this is a valid git repo.",
            "details": e.output.decode("utf-8") if e.output else str(e),
        }
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}
