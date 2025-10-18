import { analyzeWithOpenAI } from './providers/openai'
import { analyzeWithGemini } from './providers/gemini'
import { pickProviderName } from './utils'
import { AnalyzeResult, ProviderName } from '../types'

export async function analyzeMealImage(imageUrl: string, provider?: ProviderName): Promise<AnalyzeResult> {
  const use = pickProviderName(provider)
  if (use === 'openai') {
    return analyzeWithOpenAI(imageUrl)
  } else if (use === 'gemini') {
    return analyzeWithGemini(imageUrl)
  } else {
    throw new Error('Unknown provider: ' + use)
  }
}

// Suggest meal plan (wrapper) - uses provider internally
export async function suggestMealPlanForUser(userProfile: any, recentMeals: any[], provider?: ProviderName) {
  const use = pickProviderName(provider)
  const prompt = `You are a nutrition planner. User: ${JSON.stringify(userProfile)}. Recent meals: ${JSON.stringify(recentMeals)}.
Return JSON array: [{ day:1, meals:[{type:'breakfast', name:'...', calories:... , suggestion:'...'}] }]`

  if (use === 'openai') {
    // call OpenAI chat completion (similar code to analyzeWithOpenAI but different prompt)
    const { default: axios } = await import('axios')
    const apiKey = process.env.OPENAI_API_KEY
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.2
    }, { headers: { Authorization: `Bearer ${apiKey}` }})
    const text = resp.data.choices?.[0]?.message?.content
    try { return JSON.parse(text) } catch { return { raw: text } }
  } else {
    // Gemini flow - similar approach (use gemini SDK/endpoint)
    const { default: axios } = await import('axios')
    const apiKey = process.env.GEMINI_API_KEY
    const resp = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateText', {
      prompt
    }, { headers: { Authorization: `Bearer ${apiKey}` }})
    const text = resp.data?.candidates?.[0]?.content ?? resp.data?.outputText
    try { return JSON.parse(text) } catch { return { raw: text } }
  }
}
