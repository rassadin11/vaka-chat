
export function calcMaxTokens(balanceUsd: number, pricePerToken: number, safetyFactor = 0.9) {
    if (!pricePerToken || pricePerToken <= 0) return null; // бесплатная модель — не ограничиваем

    const maxTokens = Math.floor((balanceUsd * safetyFactor) / pricePerToken);

    if (maxTokens <= 50) return 0;        // баланс кончился
    if (maxTokens > 32000) return null;  // не ограничиваем если лимит огромный
    return maxTokens;
}