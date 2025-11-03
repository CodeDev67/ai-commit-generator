import subprocess
import os

def get_git_diff(repo_path: str) -> str:
    """
    Returns the current unstaged git diff of the given repository path.
    If an error occurs, returns a descriptive message instead.
    """
    try:
        # Normalize the path
        repo_path = os.path.abspath(repo_path)

        # Check if the path is a Git repository
        if not os.path.exists(os.path.join(repo_path, ".git")):
            return f"Error: '{repo_path}' is not a Git repository (no .git folder found)."

        # Run git diff command
        result = subprocess.run(
            ["git", "-C", repo_path, "diff"],
            capture_output=True,
            text=True,
            check=True
        )

        # If no changes found
        if not result.stdout.strip():
            return "No unstaged changes found."

        return result.stdout

    except subprocess.CalledProcessError as e:
        print("Git diff failed:", e.stderr)
        return f"Git diff error: {e.stderr}"

    except Exception as e:
        print("Unexpected error:", e)
        return f"Unexpected error: {str(e)}"
