import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Search,
  HelpCircle,
  Zap,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  MessageCircle
} from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: HelpCircle, color: 'text-primary' },
    { id: 'trycart', name: 'TryCart', icon: Zap, color: 'text-accent' },
    { id: 'orders', name: 'Orders', icon: ShoppingBag, color: 'text-primary' },
    { id: 'payments', name: 'Payments', icon: CreditCard, color: 'text-accent' },
    { id: 'delivery', name: 'Delivery', icon: Truck, color: 'text-primary' },
    { id: 'returns', name: 'Returns', icon: Shield, color: 'text-accent' },
  ];

  const faqs = [
    // TryCart FAQs
    {
      category: 'trycart',
      question: 'What is TryCart and how does it work?',
      answer: 'TryCart is our revolutionary feature that lets you try up to 5 clothing items at home before buying. You pay a ₹1,000 security deposit, get items delivered in 10 minutes, try them for 24 hours, and only pay for what you keep. The security amount is adjusted against your purchase, or refunded with a ₹100 visit charge if you don\'t buy anything.'
    },
    {
      category: 'trycart',
      question: 'How many items can I add to TryCart?',
      answer: 'You can add up to 5 items to your TryCart. This limit ensures quick delivery and a focused trial experience. If you need to try more items, you can create additional TryCart orders.'
    },
    {
      category: 'trycart',
      question: 'What happens to my security deposit?',
      answer: 'If you purchase items, the security deposit is adjusted against your bill. If you don\'t purchase anything, ₹100 is charged as a visit fee and the remaining ₹900 is refunded within 3-5 business days.'
    },
    {
      category: 'trycart',
      question: 'Can I extend the 24-hour trial period?',
      answer: 'The standard trial period is 24 hours. Extensions are possible in special cases for a small fee of ₹50 per day. Contact our support team to request an extension before your trial period expires.'
    },
    
    // Orders FAQs
    {
      category: 'orders',
      question: 'How fast is your delivery?',
      answer: 'We pride ourselves on ultra-fast delivery! TryCart orders are delivered within 10 minutes in our service areas. Regular orders are typically delivered within 30 minutes to 2 hours, depending on your location and product availability.'
    },
    {
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel regular orders within 5 minutes of placing them. For TryCart orders, cancellation is possible before the delivery partner picks up your items. Once items are out for delivery, cancellation isn\'t possible.'
    },
    {
      category: 'orders',
      question: 'Do you deliver everywhere in India?',
      answer: 'Currently, we deliver in major cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, and Kolkata. We\'re rapidly expanding to more cities. Check availability by entering your pincode on our website.'
    },
    
    // Payments FAQs
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods: Credit/Debit cards, UPI, Net Banking, digital wallets (Paytm, PhonePe, Google Pay), and Cash on Delivery (for regular orders only, not available for TryCart).'
    },
    {
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption and PCI DSS compliance for all payment processing. Your card details are never stored on our servers and are processed through secure payment gateways.'
    },
    {
      category: 'payments',
      question: 'When am I charged for TryCart orders?',
      answer: 'The ₹1,000 security deposit is charged immediately when you confirm your TryCart order. Final charges for items you keep are processed after your trial period ends, and the security deposit is adjusted accordingly.'
    },
    
    // Delivery FAQs
    {
      category: 'delivery',
      question: 'What are your delivery charges?',
      answer: 'Delivery is free for orders above ₹999. For smaller orders, we charge ₹99. TryCart orders have free delivery regardless of order value. Express delivery (within 30 minutes) is available for an additional ₹49.'
    },
    {
      category: 'delivery',
      question: 'Can I track my order?',
      answer: 'Yes! You can track your order in real-time through our app or website. You\'ll receive SMS and push notifications with delivery updates, including when your delivery partner is on the way.'
    },
    {
      category: 'delivery',
      question: 'What if I\'m not home during delivery?',
      answer: 'Our delivery partners will call you before arrival. If you\'re not available, we can reschedule delivery for a convenient time. For TryCart orders, someone must be present to receive the items due to the trial nature.'
    },
    
    // Returns FAQs
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer easy returns within 7 days for regular orders and 24 hours for TryCart items. Items must be unworn, with original tags, and in sellable condition. Undergarments and intimate apparel cannot be returned.'
    },
    {
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'You can initiate returns through our app, website, or by calling customer support. We provide free doorstep pickup for returns. Just schedule a pickup time that works for you, and we\'ll handle the rest.'
    },
    {
      category: 'returns',
      question: 'How long does it take to get my refund?',
      answer: 'Refunds are processed within 24 hours of our quality check. The amount reflects in your account within 3-5 business days for cards and instantly for UPI/wallets. TryCart refunds are typically faster.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - VastraBazaar</title>
        <meta name="description" content="Find answers to common questions about VastraBazaar, TryCart service, orders, payments, delivery, and returns." />
      </Helmet>

      <main className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Find quick answers to common questions about our services
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm border-white/20"
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-primary to-accent' 
                      : 'hover:border-primary'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${category.color}`} />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* FAQ List */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-border/50 rounded-lg px-4 hover:border-primary/20 transition-colors"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="font-semibold">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 pl-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or browse different categories
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Still Have Questions */}
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="text-center p-12">
              <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our customer support team is available 24/7 to help you with any questions about VastraBazaar or TryCart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-primary to-accent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button variant="outline">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground space-y-1">
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Email:</strong> support@vastrabazaar.com</p>
                <p><strong>Available:</strong> 24/7 for TryCart queries</p>
              </div>
            </CardContent>
          </Card>

          {/* Popular Topics */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Help Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover-lift cursor-pointer">
                <CardContent className="text-center p-6">
                  <Zap className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">TryCart Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete guide to using our innovative TryCart feature
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift cursor-pointer">
                <CardContent className="text-center p-6">
                  <Truck className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Delivery Info</h3>
                  <p className="text-sm text-muted-foreground">
                    Everything about our 10-minute delivery promise
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift cursor-pointer">
                <CardContent className="text-center p-6">
                  <Shield className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Returns & Refunds</h3>
                  <p className="text-sm text-muted-foreground">
                    Easy returns and hassle-free refund process
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FAQ;