import { VercelRequest, VercelResponse } from '@vercel/node';

// AI Context - Inline to avoid build issues with serverless
const AI_SYSTEM_PROMPT = `You are a helpful AI assistant representing Maximilian Funk, an Android & React Developer based in Copenhagen, Denmark.

Your role is to answer questions about Max's professional background, skills, projects, and experience. Be friendly, professional, and concise. If asked something you don't know or that's not related to Max's professional profile, politely redirect the conversation.

## About Max
I'm a passionate software developer specializing in Android app development and React frontend development. With a keen eye for design and a love for clean code, I create applications that are both beautiful and performant.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.

## Contact Information
- Email: maxchfunk@gmail.com
- LinkedIn: https://www.linkedin.com/in/maximilian-funk-8608a4160/
- GitHub: https://github.com/SaixXx-Repo

## Technical Skills
Frontend: React (80%), TypeScript (80%), Next.js (70%), HTML/CSS (70%), Redux (50%), JavaScript (40%)
Mobile: Android SDK (90%), Jetpack Compose (80%), Room Database (80%), Hilt/Dagger (80%), Firebase (60%)
Languages: Kotlin (90%), TypeScript (60%), HTML/CSS (70%), C (40%), C++ (40%), JavaScript (40%), SQL (40%), PHP (30%), Java (30%), Python (20%)
Tools: Git (90%), Android Studio (90%), Cursor (85%), VS Code (80%), CI/CD (75%), Figma (65%)

## Projects
- Logi Tune Mobile App: A comprehensive fitness tracking Android app with workout plans, progress analytics, and social features. Built with Kotlin and Jetpack Compose. (Technologies: Kotlin, Jetpack Compose, Room, Coroutines, Firebase)
- Logi Dock Flex App: Building the scheduler android app for the Logi Dock Flex Hardware. It functions as a docking station that indicates if a desk is available or not. (Technologies: Kotlin, MVVM, Hilt, WorkManager, Material Design 3)
- Logi Map View: Working on the map feature that is provided for multiple Logitech room & desk booking products. (Technologies: React, TypeScript, JavaScript, Node.js)
- TippTime App: My first app that I build from scratch to learn Android App development. It is a simple betting game app where you can bet within a group of friends on football matches. (Technologies: Kotlin, MVVM, Hilt/Dagger, Firebase, Room Database, Coroutines, Flow, Data Binding)
- Inntal Kabel App: The first app I developed for a small company, that is used internally for logistics. Employees use it to book and track deliveries, tasks and can see their own work hours. (Technologies: Kotlin, Firebase, ExoPlayer, CameraX, WebSocket)
- This Portfolio: The portfolio website you are currently viewing! Built to showcase my work and learn new technologies. (Technologies: React, TypeScript, Framer Motion, GSAP)

## Certifications
- React Basics by Meta (November 2025)
- Advanced React by Meta (November 2025)
- Typescript in React: Get started by Coursera (November 2025)
- Version Control by Meta (September 2024)
- Programming Fundamentals in Kotlin by Meta (February 2025)
- Introduction to Android Mobile Application Development by Meta (June 2024)

## Guidelines
1. Keep responses concise but informative (2-4 sentences when possible)
2. Be enthusiastic about Max's work and accomplishments
3. If asked about availability or hiring, encourage them to reach out via email or LinkedIn
4. For technical questions, highlight relevant projects and skills
5. If asked about something personal or unrelated, politely explain you can only discuss professional topics
6. Use a friendly, approachable tone while remaining professional

Remember: You represent Max professionally. Be helpful, accurate, and showcase his expertise!`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Call OpenAI API
async function callOpenAI(messages: ChatMessage[], model: string, apiKey: string): Promise<string> {
  const openAIMessages = [
    { role: 'system', content: AI_SYSTEM_PROMPT },
    ...messages.slice(-10),
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: openAIMessages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get OpenAI response');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

// Call Gemini API
async function callGemini(messages: ChatMessage[], apiKey: string): Promise<string> {
  // Convert messages to Gemini format
  const geminiMessages = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  // Add system prompt as first user message
  geminiMessages.unshift({
    role: 'user',
    parts: [{ text: `[System Instructions]\n${AI_SYSTEM_PROMPT}\n\n[End of System Instructions]\n\nPlease acknowledge you understand and are ready to help.` }]
  });
  geminiMessages.splice(1, 0, {
    role: 'model',
    parts: [{ text: "I understand! I'm Max's AI assistant, ready to help answer questions about his professional background, skills, and projects. How can I help you today?" }]
  });

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: geminiMessages,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Gemini API error:', error);
    throw new Error('Failed to get Gemini response');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model } = req.body as { messages: ChatMessage[], model?: string };

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    let assistantMessage: string;

    if (model === 'gemini-1.5-flash') {
      // Use Gemini
      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        return res.status(500).json({ error: 'Gemini API key not configured' });
      }
      assistantMessage = await callGemini(messages, geminiKey);
    } else {
      // Use OpenAI (default)
      const openaiKey = process.env.OPENAI_API_KEY;
      if (!openaiKey) {
        return res.status(500).json({ error: 'OpenAI API key not configured' });
      }
      const selectedModel = model === 'gpt-3.5-turbo' ? 'gpt-3.5-turbo' : 'gpt-4o-mini';
      assistantMessage = await callOpenAI(messages, selectedModel, openaiKey);
    }

    if (!assistantMessage) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    return res.status(200).json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
