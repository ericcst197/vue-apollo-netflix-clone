import { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation } from "~/graphql/types";
import { useAuthStore } from "~/pinia/auth";

const { mutate: createUser } = useCreateUserMutation({
    variables: undefined,
    clientId: 'authClient'
});

const { mutate: loginUser } = useLoginUserMutation({
    variables: undefined,
    clientId: 'authClient'
});

const { mutate: logoutUser } = useLogoutUserMutation({
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

export async function logout(userId: string) {
    try {
        await logoutUser({
           userId
        });

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}
