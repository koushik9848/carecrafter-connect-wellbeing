
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img 
                src="/placeholder.svg" 
                alt="CareCrafter Logo" 
                className="h-10 w-auto mr-3"
              />
            </a>
            <h1 className="text-xl font-bold text-blue-900">CareCrafter</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-700">Home</a>
            <a href="/about" className="text-blue-900 font-medium hover:text-blue-700">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-700">Contact Us</a>
            <a href="/blogs" className="text-gray-600 hover:text-blue-700">Blogs</a>
          </nav>
        </div>
      </header>

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
                src="https://placehold.co/300x300/1e40af/ffffff?text=User" 
                alt="Team Member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Rajesh Kumar</h3>
            <p className="text-gray-600 text-center">
              Rajesh is the visionary founder and lead developer of CareCrafter. With a background in healthcare informatics and software development, he identified the need for accessible health guidance and created this platform to bridge the gap between medical knowledge and everyday users.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-blue-100 rounded-full mb-4 overflow-hidden">
              <img 
                src="https://placehold.co/300x300/1e40af/ffffff?text=Friend+1" 
                alt="Team Member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Priya Sharma</h3>
            <p className="text-gray-600 text-center">
              Priya brings her expertise in medical content development to the CareCrafter team. As a healthcare professional with over 8 years of experience, she ensures that all information provided through our platform is accurate, helpful, and easily understandable for users of all ages.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-blue-100 rounded-full mb-4 overflow-hidden">
              <img 
                src="https://placehold.co/300x300/1e40af/ffffff?text=Friend+2" 
                alt="Team Member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Vikram Singh</h3>
            <p className="text-gray-600 text-center">
              Vikram is our UX/UI specialist who focuses on making CareCrafter accessible and intuitive for all users. His background in design psychology helps create an experience that feels reassuring and straightforward, especially important when users are seeking health guidance.
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
      <footer className="bg-blue-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            <img src="/placeholder.svg" alt="CareCrafter Logo" className="h-12 w-auto mb-4" />
            <h2 className="text-2xl font-bold">CareCrafter</h2>
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
