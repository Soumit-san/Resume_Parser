import React from 'react';
import { ResumeData } from '../types/resume';

interface Props {
  data: ResumeData;
}

export const ResumeDisplay: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4 bg-white p-6 rounded shadow">
      {data.name && <p><strong>Name:</strong> {data.name}</p>}
      {data.email && <p><strong>Email:</strong> {data.email}</p>}
      {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
      {data.location && <p><strong>Location:</strong> {data.location}</p>}
      {data.summary && (
        <div>
          <strong>Summary:</strong>
          <p>{data.summary}</p>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div>
          <strong>Skills:</strong>
          <ul className="list-disc list-inside">
            {data.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div>
          <strong>Education:</strong>
          <ul className="space-y-2">
            {data.education.map((edu, idx) => (
              <li key={idx}>
                <p><strong>{edu.degree}</strong> at {edu.institution}</p>
                {edu.dates && <p>{edu.dates}</p>}
                {edu.description && <p>{edu.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div>
          <strong>Experience:</strong>
          <ul className="space-y-2">
            {data.experience.map((exp, idx) => (
              <li key={idx}>
                <p><strong>{exp.title}</strong> at {exp.company}</p>
                {exp.dates && <p>{exp.dates}</p>}
                {exp.location && <p>{exp.location}</p>}
                {exp.description && <p>{exp.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
