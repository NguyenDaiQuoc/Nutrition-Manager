import type { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@nutrition/common/dist/supabaseClient'
import { analyzeMealImage } from '@nutrition/common/dist/ai/index'

const supabase = createSupabaseClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { imageUrl, mealId, provider } = req.body
  try {
    const analysis = await analyzeMealImage(imageUrl, provider)
    // store some analysis
    if (analysis.items && analysis.items.length) {
      const item = analysis.items[0]
      await supabase.from('food_items').update({
        name: item.name,
        calories: item.calories_estimate,
        meta: { analysis: analysis }
      }).eq('meal_id', mealId)
    }
    if (analysis.suggestion) {
      await supabase.from('meals').update({ note: analysis.suggestion }).eq('id', mealId)
    }
    res.status(200).json({ ok: true, analysis })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
