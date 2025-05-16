from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import fitz  # PyMuPDF
from docx import Document
import re
import spacy

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
CORS(app)

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_email(text):
    match = re.search(r'[\w\.-]+@[\w\.-]+', text)
    return match.group(0) if match else "Not Found"

def extract_phone(text):
    match = re.search(r'(\+?\d{1,3})?[\s-]?\(?\d{3,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}', text)
    return match.group(0) if match else "Not Found"

def extract_skills(text, skill_set):
    text = text.lower()
    found_skills = [skill for skill in skill_set if skill.lower() in text]
    return list(set(found_skills))

def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return "Not Found"

def parse_resume(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        text = extract_text_from_pdf(file_path)
    elif ext == ".docx":
        text = extract_text_from_docx(file_path)
    else:
        return {"error": "Unsupported file type"}

    skills_list = ["Python", "Java", "SQL", "React", "C++", "Machine Learning", "AI", "NLP"]

    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text, skills_list),
    }

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    result = parse_resume(file_path)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
