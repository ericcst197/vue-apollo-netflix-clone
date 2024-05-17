import { useCreateUserMutation, useLoginUserMutation } from "~/graphql/types";
import { useAuthStore } from "~/pinia/auth";

const auth = useAuthStore()

const { mutate: createUser } = useCreateUserMutation({
    variables: undefined,
    clientId: 'authClient'
});

const { mutate: loginUser } = useLoginUserMutation({
    variables: undefined,
    clientId: 'authClient'
});

export const calculateExpirationTime = (expiresIn: number) => {
    return Date.now() + expiresIn;
};

export async function signUp(
    email: string,
    password: string,
) {
    try {
        const response = await createUser({
            email,
            password
        })
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

export async function login(email: string, password: string) {
    try {
        const response = await loginUser({
            email,
            password,
        });
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
};

export function getUserId() {
    const storedUser = localStorage.getItem('netflix-clone-auth')

    if(storedUser) {
        return auth.data.userId || JSON.parse(storedUser).userId
    }

    return auth.data.userId;
};

export function getProfileId() {
    const storedProfile = sessionStorage.getItem('profile')

    if(storedProfile) {
        return auth.profile.id || JSON.parse(storedProfile).id
    }

    return auth.profile.id;
};
