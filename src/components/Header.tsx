import React from 'react';
import { FileText } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo">
            <FileText size={20} />
          </div>
          <h1 className="header-title">Resume Parser</h1>
        </div>
      </div>
    </header>
  );
};