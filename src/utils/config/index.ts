export const appConfig = {
    port: process.env.PORT ?? '3000',
    host: process.env.HOST ?? 'http://localhost:3000',
    jwt: {
        secret: process.env.JWT_SECRET ?? '',
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY ?? '',
    },
    redis: {
        origin: process.env.REDIS_CONN_URL ?? 'http://localhost:3000',
    },
    upload: {
        imgbbApiToken: process.env.IMGBB_API_TOKEN ?? '',
        publicGGFolderId: process.env.GGDRIVE_PUBLIC_FOLDER_ID ?? '',
    },
    n8n: {
        origin: process.env.N8N_SERVICE_URL ?? 'http://localhost:5678',
    },
}