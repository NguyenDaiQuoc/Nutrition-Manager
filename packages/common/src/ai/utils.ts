import { ProviderName } from '../types'
export function pickProviderName(explicit?: ProviderName): ProviderName {
  if (explicit) return explicit
  const env = process.env.AI_PROVIDER as ProviderName | undefined
  return env || 'openai'
}
