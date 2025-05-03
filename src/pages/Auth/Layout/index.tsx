import { Outlet, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Shared/Header";
import { CustomerRoot, ProfileRoute } from "@/pages/Customer/index.routes";
import { useEffect, useMemo } from "react";
import { useAuthContext } from "@/context/AuthContext";
const navLinks = CustomerRoot.getSubRoutes().map((subRoute) => {
	return {
		label: subRoute.getRouteName() || "Home",
		needsAuth: subRoute.getNeedsAuthentication(),
		href: subRoute.getExactPath() || "/", //? For routes that have "" as exact path i add '/'
	};
});

export default function Layout() {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuthContext();
	useEffect(() => {
		if (isAuthenticated) navigate("/");
	}, []);

	const filteredNavLinks = useMemo(() => {
		if (!isAuthenticated) {
			return navLinks.filter((link) => !link.needsAuth);
		} else {
			return navLinks.filter((link) => link.href !== ProfileRoute.getExactPath());
		}
	}, [isAuthenticated]);

	return (
		<div className="flex flex-col w-full  min-h-screen ">
			<div className="flex-1 w-full h-full flex flex-col">
				<Header navLinks={filteredNavLinks} />
				<div className="flex justify-center my-auto items-center">
					<Card className="w-full max-w-md">
						<Outlet />
					</Card>
				</div>
			</div>
		</div>
	);
}
