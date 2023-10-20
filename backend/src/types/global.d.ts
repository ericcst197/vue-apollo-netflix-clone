declare namespace NodeJS {
    interface ProcessEnv {
        VUE_APP_NODE_ENV: "development" | "production",
        VUE_APP_MONGODB_PASSWORD: string,
        VUE_APP_MONGODB: string
        VUE_APP_PORT: string,
    }
} 