import { ResumeData } from "@/lib/types";

interface TemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white text-black p-8 font-sans">
      {/* Header */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold mb-1">{data.basics.name}</h1>
        {data.basics.label && <p className="text-lg mb-2">{data.basics.label}</p>}
        
        <div className="flex flex-wrap justify-center gap-x-4 text-sm">
          {data.basics.email && <span>{data.basics.email}</span>}
          {data.basics.phone && <span>{data.basics.phone}</span>}
          {data.basics.url && <span>{data.basics.url}</span>}
          {data.basics.location && (
            <span>
              {data.basics.location.city}, {data.basics.location.state}
            </span>
          )}
        </div>
      </div>
      
      {/* Summary */}
      {data.basics.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase border-b">Professional Summary</h2>
          <p>{data.basics.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {data.work && data.work.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b">Professional Experience</h2>
          <div className="space-y-4">
            {data.work.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{job.position}</h3>
                    <p className="text-gray-700">{job.company}{job.location ? `, ${job.location}` : ''}</p>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <p className="mt-1 mb-2">{job.description}</p>
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    {edu.fieldOfStudy && <p className="text-gray-700">{edu.fieldOfStudy}</p>}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Group skills by category */}
            {Array.from(new Set(data.skills.map(skill => skill.category || 'General'))).map(category => (
              <div key={category}>
                <h3 className="font-semibold mb-1">{category}</h3>
                <ul>
                  {data.skills
                    .filter(skill => (skill.category || 'General') === category)
                    .map((skill, idx) => (
                      <li key={idx} className="mb-1">
                        {skill.name}{skill.level ? ` (${skill.level})` : ''}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{project.name}</h3>
                  {project.startDate && (
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                      {project.startDate}{project.endDate ? ` - ${project.endDate}` : ''}
                    </p>
                  )}
                </div>
                <p className="mt-1 mb-2">{project.description}</p>
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {project.url && (
                  <p className="text-sm mt-1">
                    URL: <span className="text-blue-600">{project.url}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b">Certifications</h2>
          <ul className="space-y-2">
            {data.certifications.map((cert, index) => (
              <li key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold">{cert.name}</span> - {cert.issuer}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap">{cert.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase border-b">Languages</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {data.languages.map((language, index) => (
              <li key={index}>
                <span className="font-semibold">{language.name}</span>: {language.proficiency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}