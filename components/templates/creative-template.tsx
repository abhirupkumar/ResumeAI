import { ResumeData } from "@/lib/types";

interface TemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full h-full bg-white text-black font-sans p-8">
      {/* Header with colorful accent */}
      <div className="relative mb-8">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        <div className="pt-6 flex flex-col md:flex-row md:justify-between md:items-end">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">{data.basics.name}</h1>
            {data.basics.label && <p className="text-xl text-purple-600 font-medium">{data.basics.label}</p>}
          </div>
          
          <div className="flex flex-col items-end mt-4 md:mt-0">
            <div className="flex items-center mb-1">
              <span className="text-sm">{data.basics.email}</span>
              <div className="w-2 h-2 rounded-full bg-purple-500 mx-2"></div>
              <span className="text-sm">{data.basics.phone}</span>
            </div>
            {data.basics.location && (
              <p className="text-sm text-gray-600">
                {data.basics.location.city}, {data.basics.location.state}
              </p>
            )}
            {data.basics.url && (
              <p className="text-sm text-purple-600">{data.basics.url}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Two column layout */}
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Left column - 1/3 width */}
        <div className="md:w-1/3 space-y-8">
          {/* Summary with accent styling */}
          {data.basics.summary && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-purple-700 flex items-center">
                <span className="w-6 h-0.5 bg-purple-500 mr-2"></span>
                ABOUT ME
              </h2>
              <p className="text-sm leading-relaxed">{data.basics.summary}</p>
            </div>
          )}
          
          {/* Skills with styled categories */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-purple-700 flex items-center">
                <span className="w-6 h-0.5 bg-purple-500 mr-2"></span>
                SKILLS
              </h2>
              
              {/* Group skills by category */}
              {Array.from(new Set(data.skills.map(skill => skill.category || 'General'))).map(category => (
                <div key={category} className="mb-4">
                  <h3 className="font-semibold text-sm mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills
                      .filter(skill => (skill.category || 'General') === category)
                      .map((skill, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Languages with visual indicators */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-purple-700 flex items-center">
                <span className="w-6 h-0.5 bg-purple-500 mr-2"></span>
                LANGUAGES
              </h2>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">{language.name}</span>
                      <span className="text-xs text-gray-600">{language.proficiency}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ 
                          width: language.proficiency === 'Native' ? '100%' :
                                 language.proficiency === 'Fluent' ? '90%' :
                                 language.proficiency === 'Professional' ? '75%' :
                                 language.proficiency === 'Intermediate' ? '50%' : '25%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications with accent styling */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-purple-700 flex items-center">
                <span className="w-6 h-0.5 bg-purple-500 mr-2"></span>
                CERTIFICATIONS
              </h2>
              <ul className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <li key={index}>
                    <p className="font-semibold text-sm">{cert.name}</p>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Right column - 2/3 width */}
        <div className="md:w-2/3 space-y-8 mt-8 md:mt-0">
          {/* Experience with timeline styling */}
          {data.work && data.work.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-6 text-purple-700 flex items-center">
                <span className="w-6 h-0.5 bg-purple-500 mr-2"></span>
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {data.work.map((job, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-purple-200">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-purple-500"></div>
                    
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{job.position}</h3>
                      <p className="text-sm text-gray-600 md:text-right">
                        {job.startDate} - {job.endDate}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-purple-600 mb-2">{job.company}{job.location ? `, ${job.location}` : ''}</p>
                    <p className="text-sm mb-3">{job.description}</p>
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
          
          {/* Education with attractive styling */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-6 text-purple-700 flex items-center">
                <span className="w-6 h-0.5 bg-purple-500 mr-2"></span>
                EDUCATION
              </h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-purple-200">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-purple-500"></div>
                    
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-sm text-gray-600 md:text-right">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-purple-600 mb-1">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    {edu.fieldOfStudy && <p className="text-sm mb-1">{edu.fieldOfStudy}</p>}
                    {edu.description && <p className="text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects with distinctive styling */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-6 text-purple-700 flex items-center">
                <span className="w-6 h-0.5 bg-purple-500 mr-2"></span>
                PROJECTS
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="border border-purple-100 rounded-lg p-4 bg-purple-50">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <h3 className="font-bold text-purple-700">{project.name}</h3>
                      {project.startDate && (
                        <p className="text-xs text-gray-600">
                          {project.startDate}{project.endDate ? ` - ${project.endDate}` : ''}
                        </p>
                      )}
                    </div>
                    <p className="text-sm my-2">{project.description}</p>
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                    {project.url && (
                      <p className="text-xs mt-2">
                        <a href={project.url} className="text-purple-600 hover:underline">
                          {project.url}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}