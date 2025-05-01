import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Layout() {
	return (
		<div className="flex w-full items-center justify-center min-h-screen">
			<div className="flex flex-1 justify-center mt-20">
				<Card className="w-full max-w-md">
					<Outlet />
				</Card>
			</div>
		</div>
	);
}
