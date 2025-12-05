import { projects, skills, certificates, personalInfo, socialLinks } from './projects';

// Format skills by category for the AI context
const formatSkillsByCategory = () => {
  const categories = ['frontend', 'mobile', 'languages', 'tools'] as const;
  return categories.map(category => {
    const categorySkills = skills
      .filter(s => s.category === category)
      .map(s => s.name)
      .join(', ');
    return `${category.charAt(0).toUpperCase() + category.slice(1)}: ${categorySkills}`;
  }).join('\n');
};

// Format projects for the AI context
const formatProjects = () => {
  return projects.map(p =>
    `- ${p.title}: ${p.description} (Technologies: ${p.technologies.join(', ')})`
  ).join('\n');
};

// Format certificates for the AI context
const formatCertificates = () => {
  return certificates.map(c =>
    `- ${c.title} by ${c.issuer} (${c.date})`
  ).join('\n');
};

export const AI_SYSTEM_PROMPT = `You are a helpful AI assistant representing ${personalInfo.name}, a ${personalInfo.title} based in ${personalInfo.location}. 

Your role is to answer questions about Max's professional background, skills, projects, and experience. Be friendly, professional, and concise. If asked something you don't know or that's not related to Max's professional profile, politely redirect the conversation.

## About Max
${personalInfo.bio}

## Contact Information
- Email: ${personalInfo.email}
- LinkedIn: ${socialLinks.find(s => s.name === 'LinkedIn')?.url}
- GitHub: ${socialLinks.find(s => s.name === 'GitHub')?.url}

## Technical Skills
${formatSkillsByCategory()}

## Projects
${formatProjects()}

## Certifications
${formatCertificates()}

## Guidelines
1. Keep responses concise but informative (2-4 sentences when possible)
2. Be enthusiastic about Max's work and accomplishments
3. If asked about availability or hiring, encourage them to reach out via email or LinkedIn
4. For technical questions, highlight relevant projects and skills
5. If asked about something personal or unrelated, politely explain you can only discuss professional topics
6. Use a friendly, approachable tone while remaining professional

Remember: You represent Max professionally. Be helpful, accurate, and showcase his expertise!`;

export const getAIContext = () => ({
  systemPrompt: AI_SYSTEM_PROMPT,
  personalInfo,
  skills,
  projects,
  certificates,
  socialLinks,
});

