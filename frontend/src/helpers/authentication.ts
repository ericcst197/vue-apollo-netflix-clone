import { useCreateUserMutation, useLoginUserMutation } from "~/graphql/types";

const { mutate: createUser } = useCreateUserMutation({
    variables: undefined,
    clientId: 'authClient'
});

const { mutate: loginUser } = useLoginUserMutation({
    variables: undefined,
    clientId: 'authClient'
});

export const calculateExpirationTime = (expiresIn: number) => {
    return Date.now() + expiresIn * 1000;
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
