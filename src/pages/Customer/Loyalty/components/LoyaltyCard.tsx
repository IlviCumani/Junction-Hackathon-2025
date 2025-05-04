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
import { useHttp } from "@/hooks/use-http";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Shared/Loader";

type User = {
	loyalty_points: number;
};

export default function LoyaltyCard({}) {
	const { isLoading, sendRequest } = useHttp();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		sendRequest(useHttp.GET("user/profile"), (response: User) => setUser(response));
	}, []);

	if (isLoading || !user) {
		return <Loader className="h-screen" />;
	}

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
						<Progress value={user.loyalty_points} className="h-2" />
						<span className="text-muted-foreground">
							<span className="text-2xl text-foreground">{user.loyalty_points}</span>
							/100
						</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-center mt-4">
				<Button className="">Redeem Points</Button>
			</CardFooter>
		</Card>
	);
}
