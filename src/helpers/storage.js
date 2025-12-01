import MMKVStorage from "react-native-mmkv-storage";

const MMKV = new MMKVStorage.Loader()
    .withInstanceID("usersStorage")
    .initialize();

export const storage = MMKV;

export const saveUserFavorites = async (userId, favorites) => {
    try {
        await storage.setStringAsync(userId.toString(), JSON.stringify(favorites));
    } catch (error) {
        console.log("MMKV save error:", error);
    }
};

export const getUserFavorites = async (userId) => {
    try {
        const data = await storage.getStringAsync(userId.toString());
        if (!data) return [];
        const users = JSON.parse(data);

        return users || [];
    } catch (error) {
        console.log("MMKV get error:", error);
        return [];
    }
};

export const addFavoriteItem = async (userId, itemId) => {
    const favorites = await getUserFavorites(userId);

    if (!favorites?.includes(itemId)) {
        favorites?.push(itemId);
        await saveUserFavorites(userId, favorites);
    }
};

export const removeFavoriteItem = async (userId, itemId) => {
    const favorites = await getUserFavorites(userId);
    const updated = favorites.filter(f => f !== itemId);

    await saveUserFavorites(userId, updated);
};

export const getBasket = async (userId) => {
    try {
        const key = `basket_${userId}`;
        const data = await storage.getMapAsync(key);
        return data || [];
    } catch (e) {
        console.log("Get basket error:", e);
        return [];
    }
};

export const addToBasket = async (userId, id, qty = 1) => {
    try {
        const key = `basket_${userId}`;
        let basket = await storage.getMapAsync(key) || [];

        const existing = basket.find(item => item.id === id);

        if (existing) {
            existing.qty += qty;
        } else {
            basket.push({ id, qty });
        }

        await storage.setMapAsync(key, basket);
        return true;
    } catch (e) {
        console.log("Add to basket error:", e);
        return false;
    }
};

export const updateBasketQty = async (userId, id, qty) => {
    try {
        const key = `basket_${userId}`;
        let basket = await storage.getItem(key) || [];

        if (typeof basket === "string") {
            basket = JSON.parse(basket);
        }

        basket = basket.map(item =>
          item.id === id ? { ...item, qty } : item
        );

        await storage.setItem(key, JSON.stringify(basket));
    } catch (e) {
        console.log("Update qty error:", e);
    }
};



export const removeFromBasket = async (userId, id) => {
    try {
        const key = `basket_${userId}`;
        let basket = await storage.getMapAsync(key) || [];

        basket = basket.filter(item => item.id !== id);

        await storage.setMapAsync(key, basket);
    } catch (e) {
        console.log("Remove basket error:", e);
    }
};

export const clearBasket = async (userId) => {
    try {
        const key = `basket_${userId}`;
        await storage.removeItem(key);
    } catch (e) {
        console.log("Clear basket error:", e);
    }
};

