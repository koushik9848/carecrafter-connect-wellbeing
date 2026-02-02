
import React from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Stethoscope from '@/components/Stethoscope';

interface HeaderProps {
  currentPage: 'home' | 'blogs' | 'health-tracker' | 'medical-records';
  onLogout?: () => void;
  user?: {
    name: string;
    email: string;
    profileImage?: string;
  } | null;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  handleLogin: (e: React.FormEvent) => void;
}

const Header = ({ 
  currentPage, 
  onLogout, 
  user, 
  setIsLoginOpen, 
  setIsSignupOpen, 
  isLoginOpen, 
  isSignupOpen, 
  handleLogin 
}: HeaderProps) => {
  const displayName = user?.name
    ? (user.name.includes('@') ? user.name.split('@')[0] : user.name)
    : '';

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <div className="flex items-center">
              <Stethoscope className="h-10 w-10 text-blue-900 mr-3" />
              <h1 className="text-xl font-bold text-blue-900">CareCrafter</h1>
            </div>
          </a>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="/" className={`${currentPage === 'home' ? 'text-blue-900 font-medium' : 'text-gray-600'} hover:text-blue-700`}>Home</a>
          <a href="/health-tracker" className={`${currentPage === 'health-tracker' ? 'text-blue-900 font-medium' : 'text-gray-600'} hover:text-blue-700`}>Health Tracker</a>
          <a href="/medical-records" className={`${currentPage === 'medical-records' ? 'text-blue-900 font-medium' : 'text-gray-600'} hover:text-blue-700`}>Medical Records</a>
          <a href="/blogs" className={`${currentPage === 'blogs' ? 'text-blue-900 font-medium' : 'text-gray-600'} hover:text-blue-700`}>Blogs</a>
        </nav>
        
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              <div className="mr-3 flex items-center">
                <Avatar className="h-8 w-8 mr-2 border-2 border-blue-500">
                  <AvatarImage 
                    src={user.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} 
                    alt={user.name} 
                  />
                  <AvatarFallback>
                    <User className="h-5 w-5 text-gray-500" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white bg-blue-600 px-2 py-1 rounded-full">
                  {displayName}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
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
                  <form onSubmit={() => {}}>
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
  );
};

export default Header;
