# Resume_Parser
Developed an AI system to extract and organize information from resumes,enhancing HR processes and candidate selection

This project is a full-stack Resume Parser built with a Flask backend and a Vite + React (TypeScript) frontend. It allows users to upload resumes in PDF or DOCX format and automatically extracts key information like name, email, phone number, and skills using natural language processing (NLP).

🔧 Technologies Used
Frontend:
Vite + React (TypeScript)
HTML+CSS (optional, for styling)
React Dropzone (for file upload UI)
Lucide Icons (for modern UI icons)

Backend:
Python (Flask API)
spaCy (NLP for name/entity extraction)
PyMuPDF (for PDF text extraction)
python-docx (for DOCX parsing)
Flask-CORS (to enable cross-origin requests)

🚀 Features
Upload resumes in PDF or DOCX format

Extract:
Name (using spaCy NLP)
Email address (regex)
Phone number (regex)
Skills (custom keyword-based extraction)

Simple and clean frontend UI
Reusable React components for upload, result display, and error handling
CORS-enabled backend to support local or deployed frontend

Project Structure:
backend/
│
├── resume_parser.py       # Flask backend with resume parsing logic
├── uploads/               # Folder for temporarily saving uploaded files
└── requirements.txt       # Dependencies

frontend/
│
├── src/
│   ├── components/        # React components (upload form, display, error)
│   ├── types/             # TypeScript interfaces (ResumeData, etc.)
│   ├── services/          # API call logic
│   └── App.tsx            # Main app logic
└── vite.config.ts         # Vite config

Setup Instructions:
1. Backend (Flask + Python):
cd backend
python -m venv venv
venv\Scripts\activate     # On Windows
pip install -r requirements.txt
python resume_parser.py

Make sure you have installed en_core_web_sm for spaCy:
python -m spacy download en_core_web_sm

2. Frontend (Vite + React + TS):
cd frontend
npm install
npm run dev


