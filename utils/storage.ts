import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'mum_aid_access_token';
const REFRESH_TOKEN_KEY = 'mum_aid_refresh_token';

export const tokenStorage = {
    async saveTokens(access: string, refresh: string) {
        try {
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
        } catch (error) {
            console.error("Error saving tokens", error);
        }
    },

    async getAccessToken() {
        return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    },

    async getRefreshToken() {
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    },

    async clearTokens() {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    }
};