import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Stethoscope from '@/components/Stethoscope';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('carecrafter_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login for demonstration
    const mockUser = {
      name: "Demo User",
      email: "demo@example.com",
    };
    localStorage.setItem('carecrafter_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('carecrafter_user');
    setUser(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage="home"
        user={user}
        onLogout={handleLogout}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        handleLogin={handleLogin}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to our team using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="johndoe@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  rows={5}
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Info Section */}
          <div>
            <div className="bg-blue-50 p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">support@carecrafter.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">+91 2222363672</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-sm text-gray-600">
                      Hyderabad city<br />
                      Telangana<br />
                      500070
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Office Hours</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Monday - Friday</p>
                  <p className="font-medium">9:00 AM - 6:00 PM</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Saturday</p>
                  <p className="font-medium">10:00 AM - 4:00 PM</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Sunday</p>
                  <p className="font-medium">Closed</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Technical support is available 24/7 through our online chat system.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="mt-12 bg-gray-200 h-80 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Interactive Map Would Be Displayed Here</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-4">
              <Stethoscope className="h-12 w-12 text-white mr-3" />
              <h2 className="text-2xl font-bold">CareCrafter</h2>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} CareCrafter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
