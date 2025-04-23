import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const navigate = useNavigate();
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup for demonstration
    const mockUser = {
      name: "New User",
      email: "new@example.com",
    };
    localStorage.setItem('carecrafter_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsSignupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('carecrafter_user');
    setUser(null);
  };

  const navigateToChatbot = (ageGroup: 'youth' | 'adult' | 'senior') => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    navigate('/chatbot', { state: { ageGroup } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/carecrafter-logo.svg"
              alt="CareCrafter Logo"
              className="h-10 w-auto mr-3"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            />
            <h1 className="text-xl font-bold text-blue-900">CareCrafter</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-blue-900 font-medium hover:text-blue-700">Home</a>
            <a href="/about" className="text-gray-600 hover:text-blue-700">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-700">Contact Us</a>
            <a href="/blogs" className="text-gray-600 hover:text-blue-700">Blogs</a>
          </nav>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <div className="mr-3">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">Login</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login to CareCrafter</DialogTitle>
                      <DialogDescription>
                        Enter your credentials to access your account
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLogin}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="••••••••" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Login</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-800 hover:bg-blue-700">Sign Up</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create an account</DialogTitle>
                      <DialogDescription>
                        Fill in your details to create a CareCrafter account
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSignup}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input id="signup-email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input id="signup-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" placeholder="••••••••" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Sign Up</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-800 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                Transforming your care
              </h1>
              <h2 className="text-xl md:text-2xl text-blue-100 mb-8">
                Your personalized guide to wellness
              </h2>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-blue-800 hover:bg-blue-50" size="lg" onClick={() => navigateToChatbot('adult')}>
                  Get Started
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-blue-700" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                alt="Doctor holding a stethoscope"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Care Path</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Youth */}
            <div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigateToChatbot('youth')}
            >
              <div className="h-48 overflow-hidden flex items-center justify-center bg-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
                  alt="Youth Wellness"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Youth Wellness Hub</h3>
                <p className="text-gray-600 mb-4">Specialized care and guidance for ages 13-25. Resources tailored for young adults navigating health concerns.</p>
                <div className="flex items-center text-blue-700">
                  <span>Get started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Card 2: Adult */}
            <div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigateToChatbot('adult')}
            >
              <div className="h-48 overflow-hidden flex items-center justify-center bg-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80"
                  alt="Adult Health"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Adult Health Guide</h3>
                <p className="text-gray-600 mb-4">Comprehensive health resources for adults ages 26-55. Balance wellness with your busy lifestyle.</p>
                <div className="flex items-center text-blue-700">
                  <span>Get started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Card 3: Senior */}
            <div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigateToChatbot('senior')}
            >
              <div className="h-48 overflow-hidden flex items-center justify-center bg-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                  alt="Senior Care"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Senior Care Corner</h3>
                <p className="text-gray-600 mb-4">Specialized assistance for those 56+. Resources focused on maintaining health and independence in later years.</p>
                <div className="flex items-center text-blue-700">
                  <span>Get started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=facearea&w=64&h=64&q=80"
                  alt="Jane Doe"
                  className="h-12 w-12 rounded-full object-cover border-2 border-blue-200"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Doe</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"CareCrafter's chatbot was so helpful when my daughter had a fever. The medicine recommendations and dietary advice were spot on!"</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=facearea&w=64&h=64&q=80"
                  alt="John Smith"
                  className="h-12 w-12 rounded-full object-cover border-2 border-blue-200"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">John Smith</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"I've been using the Senior Care section for my father, and it's been a lifesaver. The tailored advice for seniors is exceptional."</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=facearea&w=64&h=64&q=80"
                  alt="Amanda Richards"
                  className="h-12 w-12 rounded-full object-cover border-2 border-blue-200"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Amanda Richards</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"As a college student, the Youth Wellness Hub has been great for managing my health independently. Quick, reliable advice when I need it most."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            <img src="/carecrafter-logo.svg" alt="CareCrafter Logo" className="h-12 w-auto mb-4" />
            <h2 className="text-2xl font-bold">CareCrafter</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-blue-300">Home</a></li>
                <li><a href="/about" className="hover:text-blue-300">About</a></li>
                <li><a href="/contact" className="hover:text-blue-300">Contact Us</a></li>
                <li><a href="/blogs" className="hover:text-blue-300">Blogs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300" onClick={() => navigateToChatbot('youth')}>Youth Wellness</a></li>
                <li><a href="#" className="hover:text-blue-300" onClick={() => navigateToChatbot('adult')}>Adult Health</a></li>
                <li><a href="#" className="hover:text-blue-300" onClick={() => navigateToChatbot('senior')}>Senior Care</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
              </div>
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

export default Index;
