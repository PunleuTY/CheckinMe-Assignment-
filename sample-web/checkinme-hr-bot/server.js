const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// HR agent system prompt
const SYSTEM_PROMPT = `You are CheckinMe, a professional HR AI Assistant.
You help HR teams and employees with:
- Leave and attendance policies
- Onboarding and offboarding
- Performance reviews
- Compensation and benefits
- Compliance and labor law (general guidance only)
- Conflict resolution

Always be professional, clear, and empathetic. 
For legal matters, advise users to consult an HR legal specialist.`;

app.post('/chat', async (req, res) => {
    const { message, history } = req.body;

    // Build conversation in Gemini's format
    const contents = [
        ...(history || []),
        { role: 'user', parts: [{ text: message }] }
    ];

    const body = {
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
        }
    };

    const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.error) {
        return res.status(500).json({ error: data.error.message });
    }

    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });
});

app.listen(3000, () => console.log('CheckinMe running on http://localhost:3000'));