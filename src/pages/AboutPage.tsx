import React, { useState } from 'react';
import Header from '@/components/Header';
import Stethoscope from '@/components/Stethoscope';

const AboutPage = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the team behind CareCrafter, committed to transforming healthcare guidance through accessible technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-blue-100 rounded-full mb-4 overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=Salvar Shaik`}
                alt="Salvar Shaik" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Salvar Shaik</h3>
            <p className="text-blue-700 font-medium mb-4">Technical Lead</p>
            <p className="text-gray-600 text-center">
              Salvar led the technical development of CareCrafter. From building responsive React components to integrating chatbot features, he handled the most complex aspects of the platform. His strong backend and frontend skills ensured the project was both functional and user-friendly.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-blue-100 rounded-full mb-4 overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=Chinta Raghavendra`}
                alt="Chinta Raghavendra" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chinta Raghavendra</h3>
            <p className="text-blue-700 font-medium mb-4">Project Lead</p>
            <p className="text-gray-600 text-center">
              As the Team Lead of CareCrafter, Raghavendra was responsible for overseeing the entire project. He ensured smooth coordination between all team members, maintained timelines, and kept the development on track. His leadership and decision-making played a key role in aligning the team with the project's core vision.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-blue-100 rounded-full mb-4 overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=Mohammad Arman`}
                alt="Mohammad Arman" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mohammad Arman</h3>
            <p className="text-blue-700 font-medium mb-4">Development Lead</p>
            <p className="text-gray-600 text-center">
              Arman took charge of feature implementation and UI/UX integration. He translated ideas into actual components, worked on the page structures, and helped fine-tune the interface for performance and accessibility. His dedication brought the project's design and functionality together smoothly.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At CareCrafter, we believe that access to reliable health guidance should be available to everyone. Our mission is to empower individuals to make informed health decisions through technology that is accessible, user-friendly, and personalized.
          </p>
          <p className="text-gray-700">
            We're committed to bridging the gap between professional medical advice and everyday health questions, providing a resource that supports users through various life stages and health situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-4">
              CareCrafter combines medical knowledge with advanced technology to create a platform that understands and responds to your specific health concerns. We take a life-stage approach, recognizing that health needs evolve as we age.
            </p>
            <p className="text-gray-700">
              Our chatbot is designed to provide guidance based on established medical information, while always emphasizing the importance of professional healthcare when needed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking Forward</h2>
            <p className="text-gray-700 mb-4">
              We're continuously working to improve CareCrafter, expanding our knowledge base and refining our technology to better serve our users. Future developments include more personalized health tracking, integration with wearable devices, and expanded resources for chronic condition management.
            </p>
            <p className="text-gray-700">
              Our goal is to grow alongside our users, adapting to their changing health needs while maintaining our commitment to accessible, reliable guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
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

export default AboutPage;
