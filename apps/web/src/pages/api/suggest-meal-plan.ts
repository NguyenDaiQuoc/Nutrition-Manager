import type { NextApiRequest, NextApiResponse } from 'next'
import { suggestMealPlanForUser } from '@nutrition/common/dist/ai/index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { userProfile, recentMeals, provider } = req.body
  try {
    const plan = await suggestMealPlanForUser(userProfile, recentMeals, provider)
    res.status(200).json({ ok: true, plan })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
