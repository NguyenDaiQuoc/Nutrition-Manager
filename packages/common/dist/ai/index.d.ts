import { AnalyzeResult, ProviderName } from '../types';
export declare function analyzeMealImage(imageUrl: string, provider?: ProviderName): Promise<AnalyzeResult>;
export declare function suggestMealPlanForUser(userProfile: any, recentMeals: any[], provider?: ProviderName): Promise<any>;
