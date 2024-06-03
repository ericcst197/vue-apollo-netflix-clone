declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production",
        MONGODB_PASSWORD: string,
        MONGODB: string
        PORT: string,
    }
} 