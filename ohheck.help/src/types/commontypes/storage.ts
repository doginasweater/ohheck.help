const storage = window.localStorage;

export const get = (key: string): string => {
    return storage.getItem(key) || '';
}