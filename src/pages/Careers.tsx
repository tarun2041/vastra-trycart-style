import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Zap, 
  Heart,
  TrendingUp,
  Coffee
} from 'lucide-react';

const Careers: React.FC = () => {
  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3-5 years',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      title: 'TryCart Operations Manager',
      department: 'Operations',
      location: 'Bangalore, India', 
      type: 'Full-time',
      experience: '2-4 years',
      skills: ['Logistics', 'Analytics', 'Team Management']
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-3 years',
      skills: ['Figma', 'User Research', 'Mobile Design']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Careers - Join VastraBazaar Team</title>
        <meta name="description" content="Join VastraBazaar and help revolutionize fashion e-commerce with our innovative TryCart technology. Explore career opportunities." />
      </Helmet>

      <main className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">Join Our Team</h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Help us revolutionize fashion e-commerce and deliver clothing in 10 minutes
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Why Join Us */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">Why VastraBazaar?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <Zap className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Innovation First</h3>
                  <p className="text-sm text-muted-foreground">Work on cutting-edge TryCart technology</p>
                </CardContent>
              </Card>
              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Rapid Growth</h3>
                  <p className="text-sm text-muted-foreground">Join India's fastest-growing fashion platform</p>
                </CardContent>
              </Card>
              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <Heart className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Great Culture</h3>
                  <p className="text-sm text-muted-foreground">Collaborative, inclusive, and fun work environment</p>
                </CardContent>
              </Card>
              <Card className="text-center hover-lift">
                <CardContent className="pt-6">
                  <Coffee className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Amazing Perks</h3>
                  <p className="text-sm text-muted-foreground">Flexible hours, free fashion credits, and more</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge className="bg-accent/10 text-accent">{job.department}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.experience}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-accent">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Card className="text-center">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Don't see the right role?</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented people. Send us your resume!
              </p>
              <Button className="bg-gradient-to-r from-primary to-accent">
                Send Resume
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Email:</strong> careers@vastrabazaar.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Careers;