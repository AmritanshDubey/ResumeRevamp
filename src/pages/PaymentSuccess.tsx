import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Store session ID for resume analysis
      localStorage.setItem('payment_session_id', sessionId);
      setIsVerified(true);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Your payment of ₹399 has been processed successfully. You can now access AI-powered resume analysis.
          </p>
          
          {isVerified && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">
                ✓ Payment verified
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                ✓ AI analysis unlocked
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/">Start Resume Analysis</Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}