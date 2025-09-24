import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - VastraBazaar</title>
        <meta name="description" content="Learn how VastraBazaar protects your personal information and privacy while using our services including TryCart." />
      </Helmet>

      <main className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Quick Links */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="#collection" className="text-primary hover:text-accent transition-colors">
                  1. Data Collection
                </a>
                <a href="#usage" className="text-primary hover:text-accent transition-colors">
                  2. Data Usage
                </a>
                <a href="#sharing" className="text-primary hover:text-accent transition-colors">
                  3. Data Sharing
                </a>
                <a href="#security" className="text-primary hover:text-accent transition-colors">
                  4. Data Security
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <p className="text-lg">
                    At VastraBazaar, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Last Updated:</strong> September 24, 2024
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card id="collection">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">1.1 Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Delivery addresses and contact information</li>
                    <li>Payment information (processed securely by our payment partners)</li>
                    <li>Date of birth and gender (optional)</li>
                    <li>Profile pictures and preferences</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">1.2 TryCart Specific Data</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Items selected for home trial</li>
                    <li>Trial period preferences and feedback</li>
                    <li>Return reasons and product feedback</li>
                    <li>Security deposit payment information</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">1.3 Usage Information</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Website and app usage patterns</li>
                    <li>Product views, searches, and purchase history</li>
                    <li>Device information and IP addresses</li>
                    <li>Location data (with your permission)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card id="usage">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.1 Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Processing and fulfilling your orders</li>
                    <li>Managing TryCart deliveries and returns</li>
                    <li>Processing payments and refunds</li>
                    <li>Providing customer support</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.2 Personalization</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Recommending products based on your preferences</li>
                    <li>Customizing your shopping experience</li>
                    <li>Sending personalized offers and promotions</li>
                    <li>Improving our TryCart algorithm</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.3 Communication</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Order confirmations and delivery updates</li>
                    <li>TryCart trial reminders and return notifications</li>
                    <li>Marketing communications (with your consent)</li>
                    <li>Important service announcements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card id="sharing">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <UserCheck className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">3. Information Sharing</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-foreground font-semibold">
                    We do not sell, trade, or rent your personal information to third parties.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Service Providers</h3>
                  <p>We may share your information with trusted third-party service providers who help us operate our business:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Delivery partners for TryCart and regular orders</li>
                    <li>Payment processors for secure transactions</li>
                    <li>Cloud storage providers for data hosting</li>
                    <li>Marketing platforms for communication</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 Legal Requirements</h3>
                  <p>We may disclose your information when required by law or to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Comply with legal processes or government requests</li>
                    <li>Protect our rights, property, or safety</li>
                    <li>Prevent fraud or illegal activities</li>
                    <li>Enforce our terms and conditions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card id="security">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">4. Data Security & Your Rights</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Security Measures</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure payment processing with PCI compliance</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and employee training</li>
                    <li>Data backup and disaster recovery procedures</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Delete your account and data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Data portability (receive your data in a structured format)</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Cookies and Tracking</h3>
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Remember your preferences and login status</li>
                    <li>Analyze website usage and performance</li>
                    <li>Provide personalized content and ads</li>
                    <li>Improve our services and user experience</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.4 Data Retention</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Account data: Retained while your account is active</li>
                    <li>Order history: Kept for 7 years for legal compliance</li>
                    <li>TryCart data: Retained for 2 years for service improvement</li>
                    <li>Marketing data: Until you opt-out or withdraw consent</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Contact Information */}
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact our Data Protection Officer.
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@vastrabazaar.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> 123 Fashion Street, Mumbai, Maharashtra 400001</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Privacy;