import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useHttp } from "@/hooks/use-http";

const giftCardAmounts = [10, 25, 50, 100];

const GiftCardForm = () => {
  const [email, setEmail] = useState("");
  const [total_ammount, setTotalAmmount] = useState<number>(25);
  const [message, setMessage] = useState("");

  const { sendRequest } = useHttp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !total_ammount) {
      toast.error("Please fill out all required fields");
      return;
    }

    const giftCardData = {
      email,
      total_ammount,
      message,
    };


    sendRequest(
      useHttp.POST("giftcards/", giftCardData),
      () => {
        toast.success(`Gift card for ${email} sent successfully!`);

        // Clear form fields
        setEmail("");
        setTotalAmmount(25);
        setMessage("");
      },
      () => {
        toast.error("Something went wrong. Please try again.");
      }
    );
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-cafe-brown text-xl text-center">Customize a Gift Card</CardTitle>
          <CardDescription className="text-center">Fill the form and send it to the recipient</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Recipient Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter recipient's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_ammount">Gift Card Amount</Label>
              <Select onValueChange={(value) => setTotalAmmount(Number(value))} defaultValue={total_ammount.toString()}>
                <SelectTrigger id="total_ammount">
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
            <Button type="submit" className="w-full bg-cafe-brown hover:bg-cafe-lightBrown text-white">
              Send Gift Card
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GiftCardForm;
