import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'mum_aid_access_token';
const REFRESH_TOKEN_KEY = 'mum_aid_refresh_token';
const USER_PROFILE_KEY = 'mum_aid_user_profile';
const ACCOUNTS_STORE_KEY = 'mum_aid_accounts_store_v1';

export type StoredUserProfile = {
    email: string;
    role?: string | null;
};

type StoredAccountSession = {
    accessToken: string | null;
    refreshToken: string | null;
    profile: StoredUserProfile | null;
};

type AccountsStore = {
    activeAccountId: string | null;
    accountOrder: string[];
    accounts: Record<string, StoredAccountSession>;
};

const emptyStore = (): AccountsStore => ({
    activeAccountId: null,
    accountOrder: [],
    accounts: {},
});

const toAccountId = (email: string) => email.trim().toLowerCase();

const parseStore = (raw: string | null): AccountsStore | null => {
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as AccountsStore;
        if (!parsed || typeof parsed !== "object") return null;
        if (!parsed.accounts || typeof parsed.accounts !== "object") return null;
        if (!Array.isArray(parsed.accountOrder)) parsed.accountOrder = [];
        if (typeof parsed.activeAccountId !== "string") parsed.activeAccountId = null;
        return parsed;
    } catch (error) {
        console.error("Error parsing accounts store", error);
        return null;
    }
};

const migrateLegacyStore = async (): Promise<AccountsStore | null> => {
    const [legacyAccess, legacyRefresh, legacyProfileRaw] = await Promise.all([
        SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
        SecureStore.getItemAsync(USER_PROFILE_KEY),
    ]);

    if (!legacyAccess && !legacyRefresh && !legacyProfileRaw) {
        return null;
    }

    let legacyProfile: StoredUserProfile | null = null;
    if (legacyProfileRaw) {
        try {
            legacyProfile = JSON.parse(legacyProfileRaw) as StoredUserProfile;
        } catch (error) {
            console.error("Error parsing legacy profile", error);
        }
    }

    const fallbackEmail = legacyProfile?.email || "last-used@local";
    const accountId = toAccountId(fallbackEmail);
    const migrated = emptyStore();
    migrated.activeAccountId = accountId;
    migrated.accountOrder = [accountId];
    migrated.accounts[accountId] = {
        accessToken: legacyAccess,
        refreshToken: legacyRefresh,
        profile: legacyProfile,
    };

    await SecureStore.setItemAsync(ACCOUNTS_STORE_KEY, JSON.stringify(migrated));
    return migrated;
};

const loadStore = async (): Promise<AccountsStore> => {
    const raw = await SecureStore.getItemAsync(ACCOUNTS_STORE_KEY);
    const parsed = parseStore(raw);
    if (parsed) return parsed;

    const migrated = await migrateLegacyStore();
    if (migrated) return migrated;
    return emptyStore();
};

const saveStore = async (store: AccountsStore) => {
    await SecureStore.setItemAsync(ACCOUNTS_STORE_KEY, JSON.stringify(store));
};

const getActiveAccount = (store: AccountsStore): StoredAccountSession | null => {
    if (!store.activeAccountId) return null;
    return store.accounts[store.activeAccountId] ?? null;
};

const touchAccountOrder = (store: AccountsStore, accountId: string) => {
    const filtered = store.accountOrder.filter((id) => id !== accountId);
    store.accountOrder = [accountId, ...filtered];
};

export const tokenStorage = {
    async saveTokens(access: string, refresh: string, email?: string) {
        try {
            const store = await loadStore();
            const accountId = email
                ? toAccountId(email)
                : store.activeAccountId || "last-used@local";
            const existing = store.accounts[accountId];
            store.accounts[accountId] = {
                accessToken: access,
                refreshToken: refresh,
                profile: existing?.profile ?? null,
            };
            store.activeAccountId = accountId;
            touchAccountOrder(store, accountId);
            await saveStore(store);
        } catch (error) {
            console.error("Error saving tokens", error);
        }
    },

    async getAccessToken() {
        const store = await loadStore();
        return getActiveAccount(store)?.accessToken ?? null;
    },

    async getRefreshToken() {
        const store = await loadStore();
        return getActiveAccount(store)?.refreshToken ?? null;
    },

    async clearTokens() {
        const store = await loadStore();
        if (!store.activeAccountId) return;
        delete store.accounts[store.activeAccountId];
        store.accountOrder = store.accountOrder.filter(
            (id) => id !== store.activeAccountId,
        );
        store.activeAccountId = store.accountOrder[0] ?? null;
        await saveStore(store);
    },

    async saveUserProfile(profile: StoredUserProfile) {
        const store = await loadStore();
        const accountId = toAccountId(profile.email);
        const existing = store.accounts[accountId];
        store.accounts[accountId] = {
            accessToken: existing?.accessToken ?? null,
            refreshToken: existing?.refreshToken ?? null,
            profile,
        };
        store.activeAccountId = accountId;
        touchAccountOrder(store, accountId);
        await saveStore(store);
    },

    async getUserProfile(): Promise<StoredUserProfile | null> {
        const store = await loadStore();
        return getActiveAccount(store)?.profile ?? null;
    },

    async clearUserProfile() {
        const store = await loadStore();
        if (!store.activeAccountId) return;
        const active = store.accounts[store.activeAccountId];
        if (!active) return;
        active.profile = null;
        await saveStore(store);
    },

    async switchAccount(email: string): Promise<boolean> {
        const store = await loadStore();
        const accountId = toAccountId(email);
        const target = store.accounts[accountId];
        if (!target || !target.accessToken) return false;
        store.activeAccountId = accountId;
        touchAccountOrder(store, accountId);
        await saveStore(store);
        return true;
    },

    async listAccounts(): Promise<StoredUserProfile[]> {
        const store = await loadStore();
        return store.accountOrder
            .map((id) => store.accounts[id]?.profile)
            .filter((profile): profile is StoredUserProfile => !!profile?.email);
    },

    async getActiveAccountEmail(): Promise<string | null> {
        const store = await loadStore();
        const active = getActiveAccount(store);
        return active?.profile?.email ?? store.activeAccountId ?? null;
    },
};