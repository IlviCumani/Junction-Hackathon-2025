import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export default function LoyaltyCard({}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<div className="flex items-center gap-2 ">
						<Star className="fill-amber-400 text-amber-400" />
						<span className="text-2xl">Loyalty Points</span>
					</div>
					{/* <span className="text-2xl">300 Pts</span> */}
				</CardTitle>
				<CardDescription>
					Earn points with every purchase and redeem for rewards
				</CardDescription>
			</CardHeader>
			<CardContent className="mt-4">
				<div className="flex flex-col gap-2">
					<span>Your Points</span>
					<div className="flex items-center gap-2">
						<Progress value={50} className="h-2" />
						<span>{`${50}/300`}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-center mt-4">
				<Button className="">Redeem Points</Button>
			</CardFooter>
		</Card>
	);
}
