// controllers/auth.controller.js
import * as authService from '../services/auth.service.js';

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/api/auth',
};

export async function register(req, res) {
    try {
        const { email, password, name, promo } = req.body;

        const fieldErrors = {};

        if (!email) fieldErrors.email = 'Email обязателен';
        if (!password) fieldErrors.password = 'Пароль обязателен';
        if (!name) fieldErrors.name = 'Имя обязательно';

        if (password && password.length < 8) {
            fieldErrors.password = 'Пароль должен быть минимум 8 символов';
        }

        if (Object.keys(fieldErrors).length > 0) {
            return res.status(400).json({ fields: fieldErrors });
        }

        const result = await authService.register(email, password, name, promo);

        res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTIONS);
        res.status(201).json({ message: result.message, accessToken: result.accessToken });
    } catch (error) {
        const fieldMap = {
            'Пользователь с таким email уже существует': { field: 'email' },
            'Промокод не найден': { field: 'promo' },
            'Промокод больше не действителен': { field: 'promo' },
            'Промокод был только что использован последний раз': { field: 'promo' },
        };

        const mapped = fieldMap[error.message];

        if (mapped) {
            return res.status(400).json({
                fields: { [mapped.field]: error.message },
            });
        }

        // Неизвестная ошибка — не светим детали наружу
        console.error('Register error:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}

export async function verifyEmail(req, res) {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ error: 'Токен не передан' });
        }

        const result = await authService.verifyEmail(token);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email и пароль обязательны' });
        }

        const { accessToken, refreshToken } = await authService.login(email, password);

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export async function refreshTokens(req, res) {
    try {
        const refreshToken = req.cookies?.refreshToken;

        const { accessToken, refreshToken: newRefreshToken } =
            await authService.refreshTokens(refreshToken);

        res.cookie('refreshToken', newRefreshToken, REFRESH_COOKIE_OPTIONS);
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export async function logout(req, res) {
    try {
        const refreshToken = req.cookies?.refreshToken;
        await authService.logout(refreshToken);

        res.clearCookie('refreshToken', { path: '/api/auth' });
        res.json({ message: 'Выход выполнен успешно' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при выходе' });
    }
}