import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake, Coffee, Gift, HandCoins } from "lucide-react";

export default function RewardPrograms({}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl flex gap-2 items-center">
					<Gift />
					Rewards Program
				</CardTitle>
				<CardDescription>How our loyalty program works</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-6 mt-4">
				<div>
					<h1 className="text-md flex gap-2 items-center">
						<HandCoins />
						Earn Points
					</h1>
					<p className="text-xs text-muted-foreground">
						For every $1 spent, you earn 1 point. Points can be redeemed for rewards.
					</p>
				</div>
				<div>
					<h1 className="text-md flex gap-2 items-center">
						<Coffee />
						Redeem Rewards
					</h1>
					<p className="text-xs text-muted-foreground">
						Redeem your points for free drinks, food items, and exclusive perks.
					</p>
				</div>
				<div>
					<h1 className="text-md flex gap-2 items-center">
						<Cake />
						Birthday Reward
					</h1>
					<p className="text-xs text-muted-foreground">
						Receive a free drink of your choice during your birthday.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
