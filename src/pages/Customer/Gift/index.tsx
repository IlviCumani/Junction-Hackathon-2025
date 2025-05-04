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
import { useHttp } from "@/hooks/use-http";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const giftCardAmounts = [10, 25, 50, 100];

const GiftCardForm = () => {
  const [email, setEmail] = useState("");
  const [total_ammount, setTotalAmmount] = useState<number>(25);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const { sendRequest } = useHttp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);

    if (!email || !total_ammount) {
      toast.error("Please fill out all required fields");
      return;
    }

    setIsSubmitting(true);

    const giftCardData = { email, total_ammount, message };

    sendRequest(
      useHttp.POST("giftcards/", giftCardData),
      () => {
        toast.success(`Gift card for ${email} sent successfully!`);
        setEmail("");
        setTotalAmmount(25);
        setMessage("");
        setIsSubmitting(false);
        setEmailTouched(false);
      },
      () => {
        toast.error("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    );
  };

  const isEmailInvalid = emailTouched && !email;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center py-16 px-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="w-full max-w-lg transition-all"
      >
        <Card className="relative border-4 border-green-500 shadow-xl bg-white rounded-2xl p-4 transition-all duration-500 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-green-500 text-2xl text-center font-semibold">
              Send a Gift Card
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Enter recipient details and personalize your message 🎁
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">Recipient Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onBlur={() => setEmailTouched(true)}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "transition-all focus:ring-2 focus:ring-cafe-brown h-12 text-lg",
                    isEmailInvalid && "border-red-500"
                  )}
                  required
                />
                {isEmailInvalid && (
                  <p className="text-xs text-red-500">Email is required</p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <Label htmlFor="total_ammount">Gift Card Amount</Label>
                <Select
                  onValueChange={(value) => setTotalAmmount(Number(value))}
                  defaultValue={total_ammount.toString()}
                >
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

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message">
                  Personal Message{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal note..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none focus:ring-2 focus:ring-cafe-brown transition-all text-base p-4"
                />
              </div>
            </CardContent>

            <CardFooter>
              <motion.div whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Gift Card"
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default GiftCardForm;
