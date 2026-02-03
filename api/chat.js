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

  // Diagnostic stage - AI is assessing student's knowledge
  if (journeyState?.stage === 'diagnosing') {
    const turnInfo = journeyState.diagnosticTurn || 1;
    const minTurns = 2;
    const maxTurns = 5;

    return `${basePrompt}

CURRENT MODE: DIAGNOSTIC ASSESSMENT (Turn ${turnInfo} of max ${maxTurns})

You are currently assessing the student's knowledge level through natural conversation. Your goals:
1. Ask probing questions that reveal their understanding
2. Gauge their familiarity with key concepts
3. Note their vocabulary and comfort with terminology
4. Assess whether they're beginner, intermediate, or advanced

LEVEL DEFINITIONS:
- beginner: New to the subject, needs fundamentals explained simply, benefits from analogies
- intermediate: Understands basics, ready for more complex concepts and connections
- advanced: Strong foundation, can handle sophisticated ideas and mathematical rigor

CONVERSATION GUIDELINES:
- Be encouraging and curious about their perspective
- Ask follow-up questions based on their responses
- Don't quiz them mechanically - have a natural conversation
- ${turnInfo < minTurns ? 'Continue gathering information before making a confident assessment.' : 'You may complete the assessment if you feel confident about their level.'}

REQUIRED: After EVERY response, you MUST include diagnostic metadata in this exact format at the very end:
<!--DIAGNOSTIC:{"confidence":X.X,"suggestedLevel":"beginner|intermediate|advanced","topicsAssessed":["topic1","topic2"]}-->

Where:
- confidence: 0.0 to 1.0 (how sure you are about the level)
- suggestedLevel: your current best guess
- topicsAssessed: concepts you've been able to evaluate

When confidence reaches 0.7+ OR this is turn ${maxTurns}, naturally transition by saying something like:
"Based on our conversation, I can see you have [description of their level]. Let me tailor our learning journey accordingly..."`;
  }

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

  // Default/fallback prompt (intro stage or missing state)
  return `${basePrompt}

Guidelines:
- Explain concepts clearly and simply
- Use examples and analogies when helpful
- Break down complex topics into digestible parts
- Encourage curiosity and questions
- Correct misconceptions gently
- Adapt your explanations to the student's level`;
}
