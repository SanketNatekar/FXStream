import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, TrendingUp, Shield, Clock, Target, CheckCircle, Mail, Phone, MapPin, Calendar, Globe, ExternalLink, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { FaTelegramPlane , FaWhatsapp } from "react-icons/fa";

const LandingPage = () => {
  const batches = [
    {
      id: 1,
      title: "Smart Volume Concept",
      mode: "Online",
      language: "Hindi",
      startDate: "2024-07-15",
      duration: "8 weeks",
      price: "₹15,000",
      googleFormUrl: "https://forms.google.com/example1"
    },
    {
      id: 2,
      title: "Smart Volume Concept", 
      mode: "Offline",
      language: "Hindi",
      startDate: "2024-07-15",
      duration: "8 weeks",
      price: "₹15,000",
      googleFormUrl: "https://forms.google.com/example2"
    },
    {
      id: 3,
      title: "Smart Volume Concept",
      mode: "Online",
      language: "Marathi",
      startDate: "2024-07-15",
      duration: "8 weeks",
      price: "₹15,000",
      googleFormUrl: "https://forms.google.com/example3"
    },
    {
      id: 4,
      title: "Smart Volume concept",
      mode: "Offline", 
      language: "Marathi",
      startDate: "2024-07-15",
      duration: "8 weeks",
      price: "₹15,000",
      googleFormUrl: "https://forms.google.com/example4"
    }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      alt: "Trading Workshop",
      title: "Live Trading Workshop"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      alt: "Student Learning",
      title: "Interactive Learning Sessions"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      alt: "Expert Instructor",
      title: "Expert Instructors"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
      alt: "Online Class",
      title: "Online Classes"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      alt: "Market Analysis",
      title: "Market Analysis"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
      alt: "Success Stories",
      title: "Success Stories"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Master the
                <span className="text-primary-600 block">Financial Markets</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Join thousands of successful traders who've transformed their financial future with our comprehensive trading education platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start Learning Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Features
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 bg-primary-100 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">5,000+ Students</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-primary-500 text-primary-500" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.9/5 Rating</span>
                </div>
              </div>
            </div>
            <div className="animate-float lg:block hidden">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                alt="Trading Dashboard"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Batches Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Trading Batches
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully designed courses available in Hindi and Marathi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {batches.map((batch) => (
              <Card key={batch.id} className="hover-lift cursor-pointer border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{batch.title}</h3>
                    <span className="text-2xl font-bold text-primary-600">{batch.price}</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Mode:</span>
                      </div>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        batch.mode === 'Online' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {batch.mode}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Language:</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{batch.language}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Start Date:</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(batch.startDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Duration:</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{batch.duration}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full group"
                    onClick={() => window.open(batch.googleFormUrl, '_blank')}
                  >
                    Register Now
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/signup">
              <Button size="lg" variant="outline">
                View All Batches
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FxStreampro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform offers everything you need to succeed in the financial markets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Expert Instructors',
                description: 'Learn from certified professionals with years of market experience'
              },
              {
                icon: Award,
                title: 'Proven Curriculum',
                description: 'Industry-recognized courses designed for real-world application'
              },
              {
                icon: TrendingUp,
                title: 'Live Trading Sessions',
                description: 'Practice with real market data in our simulated environment'
              },
              {
                icon: Shield,
                title: 'Risk Management',
                description: 'Master the art of protecting your capital while maximizing returns'
              },
              {
                icon: Clock,
                title: 'Flexible Learning',
                description: 'Study at your own pace with 24/7 access to course materials'
              },
              {
                icon: Target,
                title: 'Results-Driven',
                description: 'Track your progress with detailed analytics and performance metrics'
              }
            ].map((feature, index) => (
              <Card key={index} className="hover-lift cursor-pointer border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn from the Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our latest trading insights and educational content
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://youtube.com/embed/90krrETzzf4"
                title="FxStreampro Educational Content"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center mt-8">
              <a
                href="https://www.youtube.com/@fxstreampro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <Youtube className="h-5 w-5" />
                <span>Visit our YouTube Channel</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of successful traders and start your journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Learning Environment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at our state-of-the-art facilities and learning atmosphere
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <div key={image.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover-lift">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="About FxStreampro"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About FxStreampro
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded by a team of professional traders and educators, FxStreampro has been at the forefront of trading education for over a decade. We believe that anyone can learn to trade successfully with the right guidance and tools.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Over 5,000 successful graduates',
                  'Industry-leading curriculum',
                  'Real-time market analysis',
                  'Lifetime community access'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/signup">
                <Button size="lg">Join Our Community</Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">Real stories from real traders</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Thompson',
                role: 'Day Trader',
                content: 'FxStreampro transformed my trading completely. The risk management techniques alone have saved me thousands.',
                rating: 5
              },
              {
                name: 'Maria Rodriguez',
                role: 'Investment Consultant',
                content: 'The comprehensive curriculum and expert instructors make this the best trading education platform available.',
                rating: 5
              },
              {
                name: 'David Kim',
                role: 'Portfolio Manager',
                content: 'I went from losing money to consistent profitability in just 6 months. Highly recommended!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary-500 text-primary-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to start your trading journey? Contact us today and take the first step towards financial freedom.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">info@fxstreampro.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-300">New York, NY 10001</div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/fxstreampro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://t.me/+w2_xVAHPQ005MmQ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com/fxstreampro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://youtube.com/@fxstreampro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/company/fxstreampro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>

                  <FaTelegramPlane />

                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <Button className="w-full" size="lg">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
