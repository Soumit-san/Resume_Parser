import React from 'react';
import { FileUploadForm } from './components/FileUploadForm';
import { ResumeData } from './types/resume';
import { ResumeDisplay } from './components/ResumeDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [resumeData, setResumeData] = React.useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="main">
        <div className="container">
          <div className="content">
            {!resumeData && !error && (
              <div className="intro">
                <h1>Resume Parser</h1>
                <p>
                  Upload your resume (PDF or DOCX) to extract key information automatically.
                </p>
              </div>
            )}
            
            {!resumeData && !isLoading && (
              <FileUploadForm
                onUploadStart={() => {
                  setIsLoading(true);
                  setError(null);
                }}
                onUploadSuccess={(data) => {
                  console.log("Received resume data:", data);
                  setResumeData(data);
                  setIsLoading(false);
                }}
                onUploadError={(errorMessage) => {
                  setError(errorMessage);
                  setIsLoading(false);
                }}
                isLoading={isLoading}
              />
            )}
            
            {isLoading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Analyzing your resume...</p>
              </div>
            )}
            
            {error && <ErrorDisplay message={error} onReset={() => setError(null)} />}
            
            {resumeData && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Extracted Information</h2>
                  <button 
                    onClick={() => setResumeData(null)} 
                    className="upload-another"
                  >
                    Upload Another
                  </button>
                </div>
                <ResumeDisplay data={resumeData} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;