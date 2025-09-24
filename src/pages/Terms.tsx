import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText, Users, CreditCard } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - VastraBazaar</title>
        <meta name="description" content="Read VastraBazaar's terms and conditions including TryCart service terms, payment policies, and user responsibilities." />
      </Helmet>

      <main className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Please read these terms carefully before using VastraBazaar services
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Quick Links */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="#general" className="text-primary hover:text-accent transition-colors">
                  1. General Terms
                </a>
                <a href="#trycart" className="text-primary hover:text-accent transition-colors">
                  2. TryCart Service
                </a>
                <a href="#payments" className="text-primary hover:text-accent transition-colors">
                  3. Payments
                </a>
                <a href="#user-responsibilities" className="text-primary hover:text-accent transition-colors">
                  4. User Responsibilities
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* General Terms */}
            <Card id="general">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">1. General Terms</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Welcome to VastraBazaar ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website, mobile application, and services, including our innovative TryCart feature.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">1.1 Acceptance of Terms</h3>
                  <p>
                    By accessing or using VastraBazaar services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">1.2 Service Description</h3>
                  <p>
                    VastraBazaar is an e-commerce platform specializing in fast fashion delivery. Our flagship TryCart service allows customers to try up to 5 clothing items at home before making a purchase decision.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">1.3 Eligibility</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>You must be at least 18 years old to use our services</li>
                    <li>You must provide accurate and complete information during registration</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* TryCart Service */}
            <Card id="trycart">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">2. TryCart Service Terms</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.1 TryCart Overview</h3>
                  <p>
                    TryCart is our unique service that allows customers to order up to 5 clothing items for home trial before making a purchase decision.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.2 Security Deposit</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>A refundable security deposit of ₹1,000 is required for TryCart orders</li>
                    <li>The deposit will be adjusted against items you choose to purchase</li>
                    <li>If no items are purchased, a visit charge of ₹100 will be deducted</li>
                    <li>Remaining amount will be refunded within 3-5 business days</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.3 Trial Period</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Trial period is 24 hours from delivery</li>
                    <li>Items must be returned in original condition with tags intact</li>
                    <li>Items showing signs of wear, damage, or alteration cannot be returned</li>
                    <li>Undergarments and intimate apparel cannot be part of TryCart orders</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.4 Return Process</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Items must be returned within 24 hours of delivery</li>
                    <li>Our delivery partner will collect items at the scheduled time</li>
                    <li>Late returns may incur additional charges</li>
                    <li>Items must be clean, unworn, and in original packaging</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payments */}
            <Card id="payments">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">3. Payment Terms</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Payment Methods</h3>
                  <p>
                    We accept payments via credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 Pricing</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>All prices are listed in Indian Rupees (INR) and include applicable taxes</li>
                    <li>Prices may change without notice, but changes will not affect confirmed orders</li>
                    <li>Delivery charges may apply based on location and order value</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.3 Refunds</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Refunds will be processed to the original payment method</li>
                    <li>TryCart security deposits are refunded within 3-5 business days</li>
                    <li>Regular order refunds are processed within 7-10 business days</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card id="user-responsibilities">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">4. User Responsibilities</h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Account Security</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Keep your login credentials secure and confidential</li>
                    <li>Notify us immediately of any unauthorized account access</li>
                    <li>You are responsible for all activities under your account</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Prohibited Activities</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Using the service for any illegal or unauthorized purpose</li>
                    <li>Attempting to damage, disable, or impair the service</li>
                    <li>Interfering with other users' use of the service</li>
                    <li>Providing false or misleading information</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Content and Reviews</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Reviews must be honest and based on actual product experience</li>
                    <li>No offensive, defamatory, or inappropriate content</li>
                    <li>We reserve the right to moderate and remove inappropriate content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Contact Information */}
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about these Terms and Conditions, please contact us.
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@vastrabazaar.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Last Updated:</strong> September 24, 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Terms;