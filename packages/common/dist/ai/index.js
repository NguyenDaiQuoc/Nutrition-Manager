"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMealImage = analyzeMealImage;
exports.suggestMealPlanForUser = suggestMealPlanForUser;
const openai_1 = require("./providers/openai");
const gemini_1 = require("./providers/gemini");
const utils_1 = require("./utils");
async function analyzeMealImage(imageUrl, provider) {
    const use = (0, utils_1.pickProviderName)(provider);
    if (use === 'openai') {
        return (0, openai_1.analyzeWithOpenAI)(imageUrl);
    }
    else if (use === 'gemini') {
        return (0, gemini_1.analyzeWithGemini)(imageUrl);
    }
    else {
        throw new Error('Unknown provider: ' + use);
    }
}
// Suggest meal plan (wrapper) - uses provider internally
async function suggestMealPlanForUser(userProfile, recentMeals, provider) {
    const use = (0, utils_1.pickProviderName)(provider);
    const prompt = `You are a nutrition planner. User: ${JSON.stringify(userProfile)}. Recent meals: ${JSON.stringify(recentMeals)}.
Return JSON array: [{ day:1, meals:[{type:'breakfast', name:'...', calories:... , suggestion:'...'}] }]`;
    if (use === 'openai') {
        // call OpenAI chat completion (similar code to analyzeWithOpenAI but different prompt)
        const { default: axios } = await Promise.resolve().then(() => __importStar(require('axios')));
        const apiKey = process.env.OPENAI_API_KEY;
        const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1000,
            temperature: 0.2
        }, { headers: { Authorization: `Bearer ${apiKey}` } });
        const text = resp.data.choices?.[0]?.message?.content;
        try {
            return JSON.parse(text);
        }
        catch {
            return { raw: text };
        }
    }
    else {
        // Gemini flow - similar approach (use gemini SDK/endpoint)
        const { default: axios } = await Promise.resolve().then(() => __importStar(require('axios')));
        const apiKey = process.env.GEMINI_API_KEY;
        const resp = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateText', {
            prompt
        }, { headers: { Authorization: `Bearer ${apiKey}` } });
        const text = resp.data?.candidates?.[0]?.content ?? resp.data?.outputText;
        try {
            return JSON.parse(text);
        }
        catch {
            return { raw: text };
        }
    }
}
