import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface GiftCard {
  recipientEmail: string;
  amount: number;
  message?: string;
}

const giftCardAmounts = [10, 25, 50, 100];

const GiftCardForm = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState<number>(25);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState<GiftCard[]>([]);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientEmail || !amount) {
      toast.error("Please fill out all required fields");
      return;
    }

    const newGiftCard: GiftCard = {
      recipientEmail,
      amount,
      message,
    };

    setCart((prev) => [...prev, newGiftCard]);

    toast.success(`Gift card for ${recipientEmail} added to cart`);

    setRecipientEmail("");
    setAmount(25);
    setMessage("");
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-cafe-brown text-xl text-center">
            Customize a Gift Card
          </CardTitle>
          <CardDescription className="text-center">
            Fill the form and add it to your cart
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleAddToCart}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                placeholder="Enter recipient's email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Gift Card Amount</Label>
              <Select
                onValueChange={(value) => setAmount(Number(value))}
                defaultValue={amount.toString()}
              >
                <SelectTrigger id="amount">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  {giftCardAmounts.map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      ${value}.00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-cafe-brown hover:bg-cafe-lightBrown text-white"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </form>

        {cart.length > 0 && (
          <div className="px-6 pb-4 border-t mt-4">
            <h4 className="font-semibold mb-2">Cart:</h4>
            <ul className="space-y-1 text-sm">
              {cart.map((item, index) => (
                <li key={index}>
                  🎁 {item.recipientEmail} – ${item.amount}.00
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GiftCardForm;
