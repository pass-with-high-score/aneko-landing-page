import { NextRequest, NextResponse } from 'next/server';

// Validation helpers
const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidTelegram = (username: string): boolean => {
    const cleaned = username.replace(/^@/, '');
    return cleaned.length >= 5 && cleaned.length <= 32 && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(cleaned);
};

const isValidUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
};

// Escape special characters for Telegram MarkdownV2
const escapeMarkdown = (text: string): string => {
    return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
};

const ALLOWED_EXTENSIONS = ['.zip', '.rar', '.7z'];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const name = (formData.get('name') as string || '').trim();
        const email = (formData.get('email') as string || '').trim();
        const telegram = (formData.get('telegram') as string || '').trim().replace(/^@/, '');
        const skinLink = (formData.get('skinLink') as string || '').trim();
        const skinFile = formData.get('skinFile') as File | null;

        // Server-side validation
        const errors: string[] = [];

        // Name validation
        if (!name) {
            errors.push('Name is required');
        } else if (name.length < 2 || name.length > 50) {
            errors.push('Name must be 2-50 characters');
        }

        // Email validation
        if (!email) {
            errors.push('Email is required');
        } else if (!isValidEmail(email) || email.length > 100) {
            errors.push('Invalid email address');
        }

        // Telegram validation
        if (!telegram) {
            errors.push('Telegram username is required');
        } else if (!isValidTelegram(telegram)) {
            errors.push('Invalid Telegram username');
        }

        // Must have either file or link
        const hasFile = skinFile && skinFile.size > 0;
        const hasLink = skinLink.length > 0;

        if (!hasFile && !hasLink) {
            errors.push('Please provide a download link or upload a file');
        }

        // Link validation
        if (hasLink && !isValidUrl(skinLink)) {
            errors.push('Invalid download link URL');
        }

        // File validation
        if (hasFile) {
            if (skinFile.size > MAX_FILE_SIZE) {
                errors.push('File size must be less than 20MB');
            }
            const fileName = skinFile.name.toLowerCase();
            if (!ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext))) {
                errors.push('Invalid file type. Allowed: .zip, .rar, .7z, .png, .jpg, .jpeg');
            }
        }

        // Return validation errors
        if (errors.length > 0) {
            return NextResponse.json(
                { error: errors.join(', ') },
                { status: 400 }
            );
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Escape user input for MarkdownV2
        const safeName = escapeMarkdown(name);
        const safeEmail = escapeMarkdown(email);
        const safeTelegram = escapeMarkdown(telegram);
        const safeLink = skinLink ? escapeMarkdown(skinLink) : '';

        // If file is uploaded, send it to Telegram
        if (skinFile && skinFile.size > 0) {
            const safeFileName = escapeMarkdown(skinFile.name);
            const telegramFormData = new FormData();
            telegramFormData.append('chat_id', chatId);
            telegramFormData.append('document', skinFile, skinFile.name);
            telegramFormData.append(
                'caption',
                `🎨 *New Skin Submission*\n\n` +
                `👤 *Name:* ${safeName}\n` +
                `📧 *Email:* ${safeEmail}\n` +
                `💬 *Telegram:* @${safeTelegram}\n` +
                `📁 *File:* ${safeFileName}`
            );
            telegramFormData.append('parse_mode', 'MarkdownV2');

            const response = await fetch(
                `https://api.telegram.org/bot${botToken}/sendDocument`,
                {
                    method: 'POST',
                    body: telegramFormData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Telegram API error:', errorData);
                return NextResponse.json(
                    { error: 'Failed to send to Telegram' },
                    { status: 500 }
                );
            }
        } else {
            // Send text message with link
            const message =
                `🎨 *New Skin Submission*\n\n` +
                `👤 *Name:* ${safeName}\n` +
                `📧 *Email:* ${safeEmail}\n` +
                `💬 *Telegram:* @${safeTelegram}\n` +
                (skinLink ? `🔗 *Download Link:* ${safeLink}` : '❌ No file or link provided');

            const response = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'MarkdownV2',
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Telegram API error:', errorData);
                return NextResponse.json(
                    { error: 'Failed to send to Telegram' },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Submit skin error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

