"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickProviderName = pickProviderName;
function pickProviderName(explicit) {
    if (explicit)
        return explicit;
    const env = process.env.AI_PROVIDER;
    return env || 'openai';
}
