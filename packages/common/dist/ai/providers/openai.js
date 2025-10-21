"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeWithOpenAI = analyzeWithOpenAI;
const axios_1 = __importDefault(require("axios"));
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
async function analyzeWithOpenAI(imageUrl) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
        throw new Error('OPENAI_API_KEY missing');
    const prompt = `
You are a nutrition assistant. Analyze the meal image: ${imageUrl}
Return strict JSON: {"items":[{"name":"...","calories_estimate":123,"confidence":0.9}], "suggestion":"..."}
  `.trim();
    const resp = await axios_1.default.post(OPENAI_URL, {
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are an expert nutritionist and image analyst.' },
            { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.1
    }, { headers: { Authorization: `Bearer ${apiKey}` } });
    const text = resp.data.choices?.[0]?.message?.content ?? resp.data.choices?.[0]?.text;
    try {
        const parsed = JSON.parse(text);
        return parsed;
    }
    catch {
        return { items: [], suggestion: undefined, raw: text };
    }
}
