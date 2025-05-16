import { ResumeData } from "@/lib/types";

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white text-black font-sans p-8">
      {/* Header - Super minimal */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.basics.name}</h1>
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-3">
          {data.basics.label && <span>{data.basics.label}</span>}
          {data.basics.email && <span>{data.basics.email}</span>}
          {data.basics.phone && <span>{data.basics.phone}</span>}
          {data.basics.location && (
            <span>
              {data.basics.location.city}, {data.basics.location.state}
            </span>
          )}
          {data.basics.url && <span>{data.basics.url}</span>}
        </div>
      </div>
      
      <hr className="my-6 border-gray-200" />
      
      {/* Summary - Concise */}
      {data.basics.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-sm">{data.basics.summary}</p>
        </div>
      )}
      
      {/* Experience - Clean and minimal */}
      {data.work && data.work.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Experience</h2>
          <div className="space-y-5">
            {data.work.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-medium">{job.position}</h3>
                    <p className="text-sm">{job.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                <p className="text-sm mb-2">{job.description}</p>
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
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
      
      {/* Education - Simple presentation */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-sm">{edu.institution}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-1">{edu.location}</p>
                <p className="text-sm text-gray-600 mb-1">{edu.fieldOfStudy}</p>
                {edu.description && <p className="text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills - Efficient layout */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          <div className="space-y-3">
            {/* Group skills by category */}
            {Array.from(new Set(data.skills.map(skill => skill.category || 'General'))).map(category => (
              <div key={category}>
                <h3 className="text-sm font-medium mb-1">{category}</h3>
                <div className="text-sm">
                  {data.skills
                    .filter(skill => (skill.category || 'General') === category)
                    .map(skill => skill.name)
                    .join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects - Minimal presentation */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium">{project.name}</h3>
                  {project.startDate && (
                    <p className="text-sm text-gray-600">
                      {project.startDate}{project.endDate ? ` - ${project.endDate}` : ''}
                    </p>
                  )}
                </div>
                <p className="text-sm mb-2">{project.description}</p>
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {project.url && (
                  <p className="text-xs text-gray-600 mt-1">
                    {project.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        {/* Languages - Simple listing */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Languages</h2>
            <ul className="space-y-1 text-sm">
              {data.languages.map((language, index) => (
                <li key={index}>
                  {language.name} • {language.proficiency}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Certifications - Clean presentation */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Certifications</h2>
            <ul className="space-y-2 text-sm">
              {data.certifications.map((cert, index) => (
                <li key={index}>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-gray-600">{cert.issuer} • {cert.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}