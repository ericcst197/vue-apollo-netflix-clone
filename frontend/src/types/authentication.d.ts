export interface USER_CREDENTIALS {
    uuid?: string;
    name?: string;
    phoneNumber: string;
    email: string;
    password: string;
    imageUrl?: string;
}

export interface USER_AUTH_DATA {
    isLoading: boolean;
    isFirstLogin: boolean;
    userId?: string;
    token: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn: number;
    expirationDate: number;
    tokenType: "Bearer";
}

export type TokenType = "Bearer"
