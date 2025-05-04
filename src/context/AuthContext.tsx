import { createContext, useContext, useEffect, useState } from "react";
import StorageManager from "@/models/StorageManager";
import { decode } from "jwt-js-decode";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Cake } from "lucide-react";

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

	useEffect(() => {
		const token = StorageManager.getItem("authToken");

		if (token) {
			login({
				access: token,
			});
		}
	}, []);

	useEffect(() => {
		if (user) {
			const today = new Date();
			const userBirthday = new Date(user.birthday);
			const isUsersBirthday =
				today.getDate() === userBirthday.getDate() &&
				today.getMonth() === userBirthday.getMonth();

			if (isUsersBirthday) {
				console.log("Happy Birthday!");
				toast(`Happy Birthday, ${user.first_name}!`, {
					duration: 2000,
					description: "We wish you a wonderful day!",
					icon: <Cake />,
					position: "top-right",
					// action: {
					// 	altText: "Close",
					// 	onClick: () => toast.dismiss(),
					// },
				});
			}
		}
	}, [user]);

	const login = (token: { access: string }): string => {
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

		return payload.group as string;
	};

	const logout = () => {
		setUser(null);
		setIsAuthenticated(false);
		StorageManager.removeItem("authToken");
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
			<Toaster />
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
