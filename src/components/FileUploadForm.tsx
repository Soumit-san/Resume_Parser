import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { uploadResume } from '../services/api';

interface FileUploadFormProps {
  onUploadStart: () => void;
  onUploadSuccess: (data: ResumeData) => void;
  onUploadError: (message: string) => void;
  isLoading: boolean;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({
  onUploadStart,
  onUploadSuccess,
  onUploadError,
  isLoading
}) => {
  const [fileError, setFileError] = React.useState<string | null>(null);
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFileError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    const fileType = file.type;
    
    if (
      fileType !== 'application/pdf' && 
      fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setFileError('Please upload a PDF or DOCX file.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size should be less than 5MB.');
      return;
    }
    
    try {
      onUploadStart();
      const data = await uploadResume(file);
      onUploadSuccess(data);
    } catch (error) {
      if (error instanceof Error) {
        onUploadError(error.message);
      } else {
        onUploadError('An unknown error occurred. Please try again.');
      }
    }
  }, [onUploadStart, onUploadSuccess, onUploadError]);
  
  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragReject
  } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    disabled: isLoading,
    maxFiles: 1
  });
  
  return (
    <div className="upload-form">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''} ${isDragReject ? 'reject' : ''} ${isLoading ? 'disabled' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="dropzone-content">
          {isDragActive ? (
            <>
              <Upload size={48} className="dropzone-icon" />
              <p className="dropzone-text">Drop your resume here</p>
            </>
          ) : (
            <>
              <FileText size={48} className="dropzone-icon" />
              <p className="dropzone-text">
                Drag and drop your resume here
              </p>
              <p className="dropzone-subtext">
                or click to browse files
              </p>
              <p className="dropzone-subtext">
                Supports PDF, DOCX (Max 5MB)
              </p>
            </>
          )}
        </div>
      </div>
      
      {fileError && (
        <div className="error-message">
          <AlertCircle size={18} />
          <p>{fileError}</p>
        </div>
      )}
    </div>
  );
};