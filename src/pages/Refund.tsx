import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  RefreshCcw, 
  Clock, 
  CreditCard, 
  Shield, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';

const Refund: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - VastraBazaar</title>
        <meta name="description" content="Learn about VastraBazaar's refund policy including TryCart refunds, regular order returns, and refund processing times." />
      </Helmet>

      <main className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RefreshCcw className="w-8 h-8 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Refund Policy
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Easy returns and hassle-free refunds for your peace of mind
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover-lift cursor-pointer">
              <CardContent className="pt-6">
                <RefreshCcw className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">TryCart Refunds</h3>
                <p className="text-sm text-muted-foreground">
                  Security deposit refunds for TryCart orders
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift cursor-pointer">
              <CardContent className="pt-6">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Processing Time</h3>
                <p className="text-sm text-muted-foreground">
                  3-5 business days for most refunds
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift cursor-pointer">
              <CardContent className="pt-6">
                <CreditCard className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <p className="text-sm text-muted-foreground">
                  Refund to original payment source
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift cursor-pointer">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  100% refund for eligible returns
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* TryCart Refund Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <RefreshCcw className="w-6 h-6 text-accent" />
                  TryCart Refund Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold">Security Deposit Refund</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your ₹1,000 security deposit will be refunded based on your TryCart experience:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-success flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      If You Purchase Items
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                      <li>• Security amount adjusted against purchase</li>
                      <li>• Remaining balance refunded immediately</li>
                      <li>• No additional charges applied</li>
                      <li>• Instant refund processing</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-destructive flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      If You Don't Purchase
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                      <li>• ₹100 visit charge deducted</li>
                      <li>• ₹900 refunded to your account</li>
                      <li>• Refund processed within 3-5 days</li>
                      <li>• No hidden charges</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    TryCart Return Timeline
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span><strong>0-24 hours:</strong> Trial period (free returns)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      <span><strong>24-48 hours:</strong> Late return (₹50 additional charge)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-destructive rounded-full"></span>
                      <span><strong>48+ hours:</strong> Purchase considered final</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regular Order Refunds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Regular Order Refunds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-success">Eligible for Refund</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>Defective or damaged items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>Wrong item delivered</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>Size/fit issues (within 7 days)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>Items with original tags and packaging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span>Unworn and in sellable condition</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-destructive">Not Eligible for Refund</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                        <span>Undergarments and intimate apparel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                        <span>Items worn or washed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                        <span>Items without original tags</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                        <span>Customized or personalized items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5" />
                        <span>Items damaged by customer</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Return Process</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                      <p className="text-sm font-semibold">Initiate Return</p>
                      <p className="text-xs text-muted-foreground">Via app or website</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                      <p className="text-sm font-semibold">Schedule Pickup</p>
                      <p className="text-xs text-muted-foreground">Free doorstep pickup</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                      <p className="text-sm font-semibold">Quality Check</p>
                      <p className="text-xs text-muted-foreground">Items verified</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">4</div>
                      <p className="text-sm font-semibold">Refund Processed</p>
                      <p className="text-xs text-muted-foreground">3-5 business days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-accent" />
                  Refund Processing Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">UPI/Wallets</h4>
                      <p className="text-2xl font-bold text-accent">Instant</p>
                      <p className="text-sm text-muted-foreground">Real-time refund</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Debit Cards</h4>
                      <p className="text-2xl font-bold text-accent">3-5 Days</p>
                      <p className="text-sm text-muted-foreground">Business days</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Credit Cards</h4>
                      <p className="text-2xl font-bold text-accent">5-7 Days</p>
                      <p className="text-sm text-muted-foreground">Business days</p>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">Important Note</h4>
                        <p className="text-sm text-muted-foreground">
                          Refund timelines may vary depending on your bank's processing time. VastraBazaar processes all eligible refunds within 24 hours of quality verification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Contact Support */}
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Need Help with a Refund?</h2>
                <p className="text-muted-foreground mb-6">
                  Our customer support team is here to help you with any refund-related queries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline">
                    Track Refund Status
                  </Button>
                </div>
                <div className="mt-6 space-y-1 text-sm text-muted-foreground">
                  <p><strong>Email:</strong> refunds@vastrabazaar.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Hours:</strong> 9 AM - 9 PM (Mon-Sun)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Refund;