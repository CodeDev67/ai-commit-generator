# 🧠 RepoMind — AI Commit Message & PR Generator

**RepoMind** is a full-stack project that automatically generates **meaningful Git commit messages and pull request descriptions** using Google's **Gemini AI API**.  
It analyzes your staged code changes (`git diff --staged`) and produces a clear, context-aware summary — helping developers maintain cleaner and more consistent commit histories.

---

## 🚀 Tech Stack

**Frontend:** React (with fetch API)  
**Backend:** FastAPI (Python)  
**AI Model:** Google Gemini API (via `google-generativeai` SDK)  
**Language:** Python 3.10+  

---

## 🧩 Folder Structure

```
ai-commit-generator/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

---

## ⚙️ Backend Setup (FastAPI + Gemini)

### 1️⃣ Create and activate virtual environment
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
# or source venv/bin/activate (Linux/Mac)
```

### 2️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Set your Gemini API key
Create a `.env` file in the `backend` folder:
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

### 4️⃣ Run the FastAPI server
```bash
uvicorn main:app --reload --port 8080
```

Your backend runs at: [http://127.0.0.1:8080](http://127.0.0.1:8080)

---

## 💻 Frontend Setup (React)

### 1️⃣ Navigate to frontend
```bash
cd ../frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the React app
```bash
npm start
```

The frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔗 API Endpoint

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/generate` | POST | Generates commit message and PR description for staged changes |

### Example Request Body:
```json
{
  "repo_path": "C:\\Users\\aasif\\Desktop\\ai-commit-generator\\backend"
}
```

### Example Response:
```json
{
  "result": "feat: add FastAPI backend with Gemini integration\n\nPull Request Description:\n- Added /generate endpoint\n- Integrated google-generativeai for commit message generation"
}
```

---

## 🧠 How It Works

1. The backend fetches your **staged git diff** using `subprocess.check_output(["git", "diff", "--staged"])`.
2. Sends the diff to **Google Gemini** with a custom prompt.
3. The AI model generates a meaningful commit message + PR description.
4. Frontend displays and allows copying the response.

---

## 🛠️ Development Notes

- Ensure there are **staged changes** in your repo (`git add <files>`) before clicking "Generate".
- The backend must run before starting the frontend.
- If you hit **429 errors**, it’s due to Gemini API rate limits — try again after a minute.

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Aasif Mohammad**  
🔗 [GitHub Profile](https://github.com/CodeDev67)

