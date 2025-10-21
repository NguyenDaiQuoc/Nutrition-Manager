export type ProviderName = 'openai' | 'gemini';
export interface AnalyzeResultItem {
    name: string;
    calories_estimate?: number;
    confidence?: number;
}
export interface AnalyzeResult {
    items: AnalyzeResultItem[];
    suggestion?: string;
    raw?: any;
}
export interface UserProfile {
    id: string;
    full_name?: string;
    email?: string;
    phone?: string;
    preferences?: any;
}
