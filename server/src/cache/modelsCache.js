const CACHE_TTL = 1000 * 60 * 60; // 1 час

let cache = {
    data: null,
    cachedAt: 0,
};

export function getCachedModels() {
    if (!cache.data || Date.now() - cache.cachedAt > CACHE_TTL) return null;
    return cache.data;
}

export function setCachedModels(data) {
    cache = { data, cachedAt: Date.now() };
}

export function invalidateModelsCache() {
    cache = { data: null, cachedAt: 0 };
}
