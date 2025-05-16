import { ResumeData } from "@/lib/types";

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white text-black font-sans flex">
      {/* Left sidebar */}
      <div className="w-1/3 bg-blue-50 p-6 flex flex-col">
        <div className="mb-8 text-center">
          <div className="w-32 h-32 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-blue-600">
            {data.basics.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 className="text-xl font-bold">{data.basics.name}</h1>
          {data.basics.label && <p className="text-blue-600">{data.basics.label}</p>}
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-200 pb-1">Contact</h2>
          <ul className="space-y-2 text-sm">
            {data.basics.email && (
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <span>{data.basics.email}</span>
              </li>
            )}
            {data.basics.phone && (
              <li className="flex items-start">
                <span className="mr-2">📱</span>
                <span>{data.basics.phone}</span>
              </li>
            )}
            {data.basics.url && (
              <li className="flex items-start">
                <span className="mr-2">🌐</span>
                <span>{data.basics.url}</span>
              </li>
            )}
            {data.basics.location && (
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>
                  {data.basics.location.city}, {data.basics.location.state}
                </span>
              </li>
            )}
          </ul>
        </div>
        
        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-200 pb-1">Skills</h2>
            {/* Group skills by category */}
            {Array.from(new Set(data.skills.map(skill => skill.category || 'General'))).map(category => (
              <div key={category} className="mb-3">
                <h3 className="font-semibold text-sm mb-1">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills
                    .filter(skill => (skill.category || 'General') === category)
                    .map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-200 pb-1">Languages</h2>
            <ul className="space-y-1">
              {data.languages.map((language, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-sm text-gray-600">{language.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-200 pb-1">Certifications</h2>
            <ul className="space-y-3">
              {data.certifications.map((cert, index) => (
                <li key={index}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-xs">{cert.issuer} • {cert.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {data.basics.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-800 border-b border-blue-200 pb-1">About Me</h2>
            <p className="text-sm">{data.basics.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {data.work && data.work.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-blue-800 border-b border-blue-200 pb-1">Experience</h2>
            <div className="space-y-4">
              {data.work.map((job, index) => (
                <div key={index} className="relative pl-6 pb-4">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="absolute left-2 top-6 bottom-0 w-[1px] bg-blue-200"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-bold">{job.position}</h3>
                    <p className="text-sm text-gray-600">
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 mb-2">{job.company}{job.location ? `, ${job.location}` : ''}</p>
                  <p className="text-sm mb-2">{job.description}</p>
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-disc pl-4 space-y-1 text-sm">
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
            <h2 className="text-xl font-bold mb-4 text-blue-800 border-b border-blue-200 pb-1">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className={`absolute left-2 top-6 ${index === data.education.length - 1 ? 'h-0' : 'bottom-0'} w-[1px] bg-blue-200`}></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 mb-1">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  {edu.fieldOfStudy && <p className="text-sm">{edu.fieldOfStudy}</p>}
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-blue-800 border-b border-blue-200 pb-1">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-bold">{project.name}</h3>
                    {project.startDate && (
                      <p className="text-xs text-gray-600">
                        {project.startDate}{project.endDate ? ` - ${project.endDate}` : ''}
                      </p>
                    )}
                  </div>
                  <p className="text-sm mb-2">{project.description}</p>
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  {project.url && (
                    <p className="text-xs mt-1 text-blue-600">
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}