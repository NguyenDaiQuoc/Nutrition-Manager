"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeWithGemini = analyzeWithGemini;
/**
 * Gemini provider example.
 * Uses @google/generative-ai package when deploying for real.
 * Here we implement a request using the official SDK pattern (pseudo).
 *
 * NOTE: You must install @google/generative-ai on the server project to use this.
 */
const axios_1 = __importDefault(require("axios"));
async function analyzeWithGemini(imageUrl) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
        throw new Error('GEMINI_API_KEY missing');
    // Two approaches:
    // 1) If you have the SDK @google/generative-ai, use it.
    // 2) Or call REST endpoint with API key (depends on your Google Cloud setup).
    //
    // For clarity here we'll call the REST "generateText" like interface - but
    // in real deployment prefer official SDK.
    //
    // We'll send a prompt asking for strict JSON.
    const prompt = `
You are a nutrition assistant. Analyze the meal image: ${imageUrl}
Return strict JSON: {"items":[{"name":"...","calories_estimate":123,"confidence":0.9}], "suggestion":"..."}
  `.trim();
    // This is a placeholder call - replace with actual Gemini SDK call.
    // Example with SDK:
    // const client = new GoogleGenerativeAI(apiKey); const resp = await client.model.generate(...)
    // We'll emulate by calling a hypothetical endpoint (you must adapt).
    const resp = await axios_1.default.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateText', {
        prompt
    }, { headers: { Authorization: `Bearer ${apiKey}` } });
    const text = resp.data?.candidates?.[0]?.content ?? resp.data?.outputText ?? resp.data?.text;
    try {
        return JSON.parse(text);
    }
    catch {
        return { items: [], suggestion: undefined, raw: text };
    }
}
