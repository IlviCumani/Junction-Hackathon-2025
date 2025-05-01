class StorageManager {
	static setItem<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static getItem(key: string = "") {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	}

	static removeItem(key: string): void {
		localStorage.removeItem(key);
	}
}

export default StorageManager;
