import { createContext, useContext, useEffect, useState } from "react";
import StorageManager from "@/models/StorageManager";
import { useHttp } from "@/hooks/use-http";
import { decode } from "jwt-js-decode";

type User = {
	// token_type: string;
	user_id: number;
	first_name: string;
	last_email: string;
	birthday: string;
	group: string;
};

type AuthProviderState = {
	user: User | null;
	isAuthenticated: boolean;
	login: (token: { access: string }) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthProviderState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { sendRequest } = useHttp();

	useEffect(() => {
		const token = StorageManager.getItem("authToken");

		if (token) {
			login({
				access: token,
			});
		}
	}, []);

	const login = (token: { access: string }) => {
		const user = decode(token.access);
		const payload = {
			user_id: user.payload.user_id,
			first_name: user.payload.first_name,
			last_email: user.payload.last_email,
			birthday: user.payload.birthday,
			group: user.payload.group,
		};

		setUser(payload);
		setIsAuthenticated(true);
		StorageManager.setItem("authToken", token.access);
	};

	const logout = () => {
		setUser(null);
		setIsAuthenticated(false);
		StorageManager.removeItem("authToken");
	};

	console.log(user);
	console.log(isAuthenticated);
	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
}
