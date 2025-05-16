import { ResumeData } from "@/lib/types";

interface TemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white text-black font-serif p-8">
      {/* Header - Sophisticated executive style */}
      <div className="border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-wide uppercase">{data.basics.name}</h1>
        {data.basics.label && (
          <p className="text-xl mb-4 text-gray-700 font-serif italic">{data.basics.label}</p>
        )}
        
        <div className="flex justify-between text-sm">
          <div className="space-y-1">
            {data.basics.email && <p className="font-medium">{data.basics.email}</p>}
            {data.basics.phone && <p>{data.basics.phone}</p>}
          </div>
          
          <div className="space-y-1 text-right">
            {data.basics.url && <p>{data.basics.url}</p>}
            {data.basics.location && (
              <p>
                {data.basics.location.city}, {data.basics.location.state}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Executive Summary - Premium presentation */}
      {data.basics.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-widest border-b border-gray-300 pb-2">Executive Summary</h2>
          <p className="text-gray-800 leading-relaxed">{data.basics.summary}</p>
        </div>
      )}
      
      {/* Core Competencies - Elegant grid */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-widest border-b border-gray-300 pb-2">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {data.skills.slice(0, 9).map((skill, index) => (
              <div key={index} className="text-center py-2 border border-gray-200">
                <span className="font-serif">{skill.name}</span>
              </div>
            ))}
          </div>
          
          {/* Additional skills if any */}
          {data.skills.length > 9 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Additional Expertise</h3>
              <p className="text-gray-700">
                {data.skills.slice(9).map(skill => skill.name).join(' • ')}
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Professional Experience - Refined timeline */}
      {data.work && data.work.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-widest border-b border-gray-300 pb-2">Professional Experience</h2>
          <div className="space-y-6 mt-4">
            {data.work.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-gray-900">{job.company}</h3>
                  <p className="text-gray-700">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <p className="font-medium italic mb-2">{job.position}{job.location ? ` | ${job.location}` : ''}</p>
                <p className="text-gray-800 mb-3">{job.description}</p>
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="font-serif mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education - Formal presentation */}
      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-widest border-b border-gray-300 pb-2">Education</h2>
          <div className="space-y-4 mt-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="italic">{edu.fieldOfStudy}</p>
                    <p>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  </div>
                  <p className="text-gray-700">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.description && <p className="mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Balanced two-column layout for additional sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest border-b border-gray-300 pb-2">Certifications</h2>
            <ul className="space-y-3 mt-4">
              {data.certifications.map((cert, index) => (
                <li key={index}>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-gray-700 text-sm">{cert.issuer} • {cert.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest border-b border-gray-300 pb-2">Languages</h2>
            <ul className="space-y-2 mt-4">
              {data.languages.map((language, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-gray-700">{language.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Projects - Formal project showcase */}
      {data.projects && data.projects.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-widest border-b border-gray-300 pb-2">Selected Projects</h2>
          <div className="space-y-4 mt-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.startDate && (
                    <p className="text-gray-700">
                      {project.startDate}{project.endDate ? ` - ${project.endDate}` : ''}
                    </p>
                  )}
                </div>
                <p className="mb-2">{project.description}</p>
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="font-serif mr-2">•</span>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {project.url && (
                  <p className="text-sm text-gray-700 mt-1 italic">
                    {project.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}