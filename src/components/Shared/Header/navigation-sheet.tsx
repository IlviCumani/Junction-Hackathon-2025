import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import { NavMenu } from "./nav-menu";

type NavigationSheetProps = {
	navLinks: { label: string; href: string }[];
};

export const NavigationSheet = ({ navLinks = [] }: NavigationSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<NavMenu
					orientation="vertical"
					className="mt-12"
					hideUnderline
					navLinks={navLinks}
				/>
			</SheetContent>
		</Sheet>
	);
};
