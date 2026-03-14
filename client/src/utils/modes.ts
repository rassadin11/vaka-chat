export type ModeId = 'fast' | 'deep' | 'search' | 'deep-research' | 'critic' | 'tutor';

export interface Mode {
    id: ModeId;
    label: string;
    title: string;
    icon: string;
    systemPrompt?: string;
    plugin?: string;
    forceModel?: string;
    excludes?: ModeId[];
}

export const MODES: Mode[] = [
    {
        id: 'fast',
        label: 'Быстрее',
        title: 'Краткие и точные ответы без лишних деталей',
        icon: '⚡',
        systemPrompt: 'Be concise and direct. Give short, focused answers without unnecessary explanations.',
        excludes: ['deep'],
    },
    {
        id: 'deep',
        label: 'Глубже',
        title: 'Развёрнутый анализ с пошаговым рассуждением',
        icon: '🧠',
        systemPrompt: 'Think deeply and thoroughly. Break down complex topics step by step with detailed analysis and reasoning.',
        excludes: ['fast'],
    },
    {
        id: 'search',
        label: 'Веб-поиск',
        title: 'Поиск актуальной информации в интернете',
        icon: '🌐',
        plugin: 'web',
    },
    {
        id: 'deep-research',
        label: 'Исследование',
        title: 'Автономный поиск по десяткам источников с анализом. Дорогостоящий режим для сложных вопросов',
        icon: '🔬',
        forceModel: 'perplexity/sonar-deep-research', // переключает модель принудительно
        excludes: ['search', 'fast'],
    },
    {
        id: 'critic',
        label: 'Критик',
        title: 'Найди слабые места и разрушь идею',
        icon: '🔥',
        systemPrompt: 'Act as a ruthless critic and devil\'s advocate. Your job is to find flaws, edge cases, logical gaps, and weak assumptions in any idea or plan. Be direct and harsh. Do not soften feedback. End with what would make the idea actually solid.',
    },
    {
        id: 'tutor',
        label: 'Объясни',
        title: 'Объяснение через примеры и аналогии',
        icon: '🎓',
        systemPrompt: 'You are a patient tutor. Explain concepts using simple analogies and real-world examples. Check understanding by asking clarifying questions. Avoid jargon unless you define it first. Adapt complexity to what the user seems to know.',
    },
];