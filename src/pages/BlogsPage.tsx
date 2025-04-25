import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import BlogModal from '@/components/BlogModal';
import Stethoscope from '@/components/Stethoscope';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Effective Remedies for Common Colds",
    excerpt: "Discover natural and over-the-counter solutions that can help alleviate cold symptoms and speed up recovery.",
    image: "https://placehold.co/800x500/1e40af/ffffff?text=Cold+Remedies",
    date: "April 18, 2025",
    author: "Dr. Priya Sharma",
    category: "Wellness"
  },
  {
    id: 2,
    title: "Top Foods That Boost Your Immune System",
    excerpt: "Learn about the nutrients and foods that can strengthen your body's natural defenses against illness.",
    image: "https://placehold.co/800x500/1e40af/ffffff?text=Immune+Boosting+Foods",
    date: "April 12, 2025",
    author: "Dr. Vikram Singh",
    category: "Nutrition"
  },
  {
    id: 3,
    title: "Understanding Medication Dosage for Children",
    excerpt: "A comprehensive guide to safe and effective medication dosing practices for children of different age groups.",
    image: "https://placehold.co/800x500/1e40af/ffffff?text=Children+Medication",
    date: "April 5, 2025",
    author: "Dr. Ananya Desai",
    category: "Pediatrics"
  },
  {
    id: 4,
    title: "When to Visit a Doctor: Warning Signs You Shouldn't Ignore",
    excerpt: "Recognize the symptoms that warrant professional medical attention and when home remedies aren't enough.",
    image: "https://placehold.co/800x500/1e40af/ffffff?text=Doctor+Visit+Signs",
    date: "March 28, 2025",
    author: "Dr. Rajesh Kumar",
    category: "Healthcare"
  },
  {
    id: 5,
    title: "Self-Care Tips During Seasonal Changes",
    excerpt: "Practical advice for maintaining wellness during seasonal transitions, when many people experience health challenges.",
    image: "https://placehold.co/800x500/1e40af/ffffff?text=Seasonal+Self+Care",
    date: "March 20, 2025",
    author: "Dr. Priya Sharma",
    category: "Wellness"
  }
];

const BlogsPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('carecrafter_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleReadMore = (blog: any) => {
    setSelectedBlog({
      ...blog,
      content: `This detailed article provides comprehensive information about ${blog.title.toLowerCase()}. 
      The content explores various aspects of the topic, backed by medical research and expert opinions.
      
      Key Points:
      - Understanding the basics
      - Prevention and early detection
      - Treatment options and management
      - Lifestyle modifications
      - When to seek professional help
      
      Our healthcare experts recommend following evidence-based practices and consulting with medical professionals for personalized advice.`
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage="blogs"
        user={user}
        onLogout={handleLogout}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        handleLogin={handleLogin}
      />

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
            <a href="/about" className="text-gray-600 hover:text-blue-700">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-700">Contact Us</a>
            <a href="/blogs" className="text-blue-900 font-medium hover:text-blue-700">Blogs</a>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights and practical advice to help you take control of your health
          </p>
        </div>

        {/* Featured Blog Post */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: "300px" }}
                />
              </div>
              <div className="md:w-3/5">
                <CardHeader>
                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <span className="uppercase font-semibold">{blogPosts[0].category}</span>
                    <span className="mx-2">•</span>
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <CardTitle className="text-3xl">{blogPosts[0].title}</CardTitle>
                  <CardDescription className="text-lg">
                    {blogPosts[0].excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Common colds affect millions of people each year, but effective remedies can make a significant difference in recovery time and symptom management. From hydration to rest, and from over-the-counter medications to natural approaches, this comprehensive guide explores the best ways to combat cold symptoms.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm mr-3">
                      PS
                    </div>
                    <span className="font-medium text-gray-900">By {blogPosts[0].author}</span>
                  </div>
                  <button
                    onClick={() => handleReadMore(blogPosts[0])}
                    className="text-blue-700 hover:text-blue-800 font-medium flex items-center"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map(post => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-blue-700 mb-2">
                  <span className="uppercase font-semibold">{post.category}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">
                  {/* Example of blog post content */}
                  This article provides detailed information and expert insights on {post.title.toLowerCase()}.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs mr-3">
                    {post.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="font-medium text-sm text-gray-900">{post.author}</span>
                </div>
                <button
                  onClick={() => handleReadMore(post)}
                  className="text-blue-700 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest health tips, research, and wellness advice delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-800 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <BlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        blog={selectedBlog || { 
          title: '', 
          content: '', 
          image: '', 
          author: '', 
          date: '' 
        }} 
      />

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

export default BlogsPage;
