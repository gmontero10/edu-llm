export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages, subject, journeyState } = req.body;

    // Build system prompt based on journey stage
    const systemPrompt = buildSystemPrompt(subject, journeyState);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.2',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.error?.message || 'OpenAI API error' });
    }

    const data = await response.json();
    return res.status(200).json({ message: data.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function buildSystemPrompt(subject, journeyState) {
  const basePrompt = `You are an expert ${subject.name} tutor embodying the character and teaching style of a renowned historical figure. Your role is to help students learn ${subject.name} concepts in an engaging and educational way.

Subject focus: ${subject.name} - ${subject.description}`;

  // Learning stage - personalized tutoring at diagnosed level
  if (journeyState?.stage === 'learning' && journeyState?.level) {
    const levelGuidelines = {
      beginner: `TEACHING APPROACH FOR BEGINNER:
- Use simple, everyday analogies to explain concepts
- Avoid jargon; when you must use technical terms, define them clearly
- Break complex ideas into very small, digestible steps
- Celebrate small wins and build confidence
- Use concrete examples before abstract principles
- Check understanding frequently with gentle questions`,

      intermediate: `TEACHING APPROACH FOR INTERMEDIATE:
- Build on their existing foundations
- Connect new concepts to what they already know
- Introduce proper terminology with brief explanations
- Encourage them to make predictions and test ideas
- Use a mix of explanation and guided discovery
- Challenge them appropriately without overwhelming`,

      advanced: `TEACHING APPROACH FOR ADVANCED:
- Engage with sophisticated concepts directly
- Use mathematical formulations when appropriate
- Discuss edge cases, exceptions, and nuances
- Encourage critical thinking and deeper analysis
- Connect to current research or advanced applications
- Challenge assumptions and explore implications`,
    };

    return `${basePrompt}

CURRENT MODE: PERSONALIZED TUTORING
Student Level: ${journeyState.level.toUpperCase()}

${levelGuidelines[journeyState.level]}

General Guidelines:
- Explain concepts clearly and adapt to their level
- Use examples that resonate with their understanding
- Break down complex topics appropriately
- Encourage curiosity and questions
- Correct misconceptions gently
- Build progressively on what they learn`;
  }

  // Default/fallback prompt
  return `${basePrompt}

Guidelines:
- Explain concepts clearly and simply
- Use examples and analogies when helpful
- Break down complex topics into digestible parts
- Encourage curiosity and questions
- Correct misconceptions gently
- Adapt your explanations to the student's level`;
}
