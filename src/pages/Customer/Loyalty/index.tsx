import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Coffee, Gift, Star, Loader2 } from "lucide-react";

interface PointsCardProps {
  onRedeemPoints?: () => void;
}

const MOCK_LOYALTY_POINTS = 240;

const PointsCard = ({ onRedeemPoints }: PointsCardProps) => {
  const [progress, setProgress] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTotalPoints(MOCK_LOYALTY_POINTS);
      updateProgressBar(MOCK_LOYALTY_POINTS);
      setLoading(false);
    }, 1000);
  }, []);

  const updateProgressBar = (points: number) => {
    const pointsToNextReward = 100;
    const currentProgress = points % pointsToNextReward;
    const progressPercentage = (currentProgress / pointsToNextReward) * 100;
    setTimeout(() => {
      setProgress(progressPercentage);
    }, 300);
  };

  const pointsToNextReward = 100;
  const currentProgress = totalPoints % pointsToNextReward;
  const availableRewards = Math.floor(totalPoints / pointsToNextReward);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-cafe-brown" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              Loyalty Points
            </CardTitle>
            <span className="text-2xl font-bold text-cafe-brown">{totalPoints}</span>
          </div>
          <CardDescription className="text-sm">
            Earn points with every purchase and redeem for rewards
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress to next reward</span>
            <span>{currentProgress} / {pointsToNextReward}</span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="mt-6">
            <h4 className="font-medium mb-2 text-base">Available Rewards:</h4>
            {availableRewards > 0 ? (
              <ul className="space-y-2">
                {availableRewards >= 1 && (
                  <li className="flex items-center gap-2 text-sm">
                    <Coffee className="h-4 w-4 text-cafe-brown" />
                    <span>Free coffee (100 points)</span>
                  </li>
                )}
                {availableRewards >= 3 && (
                  <li className="flex items-center gap-2 text-sm">
                    <Gift className="h-4 w-4 text-cafe-brown" />
                    <span>Bakery item of your choice (300 points)</span>
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                You don't have enough points for rewards yet. Keep earning!
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={onRedeemPoints}
            disabled={availableRewards === 0}
            className="w-full bg-cafe-brown hover:bg-cafe-lightBrown"
          >
            Redeem Points
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PointsCard;
