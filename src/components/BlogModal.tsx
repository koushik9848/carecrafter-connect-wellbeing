
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Bookmark, Share } from "lucide-react";

interface BlogImage {
  url: string;
  caption?: string;
  alt: string;
}

interface BlogSection {
  title: string;
  content: string;
  image?: BlogImage;
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: {
    title: string;
    content?: string;
    image: string;
    author: string;
    date: string;
    readTime?: string;
    sections?: BlogSection[];
    references?: string[];
    authorBio?: string;
    authorImage?: string;
    relatedPosts?: Array<{
      id: number;
      title: string;
      excerpt: string;
    }>;
  };
}

const BlogModal = ({ isOpen, onClose, blog }: BlogModalProps) => {
  // Determine if we're using the detailed format with sections or the old format
  const hasDetailedFormat = blog.sections && blog.sections.length > 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="uppercase font-medium">{blog.category || "Health"}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {blog.readTime || "10 min read"}
            </span>
          </div>
          <DialogTitle className="text-3xl font-bold leading-tight">{blog.title}</DialogTitle>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={blog.authorImage || `https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`} alt={blog.author} />
                <AvatarFallback>{blog.author.split(" ").map(name => name[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{blog.author}</div>
                <div className="text-sm text-gray-500">{blog.date}</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" title="Bookmark">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Share">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-6 mt-6">
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-lg"
              />
              {blog.imageCaption && (
                <div className="text-sm text-gray-500 italic mt-2">{blog.imageCaption}</div>
              )}
            </div>
            
            {hasDetailedFormat ? (
              <div className="space-y-8">
                {/* Table of Contents */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Table of Contents</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {blog.sections.map((section, idx) => (
                      <li key={idx} className="text-blue-700 hover:underline cursor-pointer">
                        {section.title}
                      </li>
                    ))}
                  </ol>
                </div>
                
                {/* Sections with content */}
                {blog.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <div className="prose max-w-none leading-relaxed" 
                      dangerouslySetInnerHTML={{ __html: section.content }}>
                    </div>
                    
                    {section.image && (
                      <div className="my-6">
                        <img
                          src={section.image.url}
                          alt={section.image.alt}
                          className="w-full h-auto rounded-lg"
                        />
                        {section.image.caption && (
                          <div className="text-sm text-gray-500 italic mt-2">{section.image.caption}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* References */}
                {blog.references && blog.references.length > 0 && (
                  <div className="border-t pt-6 mt-8">
                    <h3 className="text-xl font-bold mb-4">References</h3>
                    <ol className="list-decimal list-outside ml-5 space-y-2">
                      {blog.references.map((reference, idx) => (
                        <li key={idx} className="text-gray-700">{reference}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {/* Author Bio */}
                {blog.authorBio && (
                  <div className="bg-gray-50 p-6 rounded-lg mt-8">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={blog.authorImage || `https://api.dicebear.com/7.x/initials/svg?seed=${blog.author}`} alt={blog.author} />
                        <AvatarFallback>{blog.author.split(" ").map(name => name[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{blog.author}</div>
                        <div className="text-sm text-gray-500">Medical Expert</div>
                      </div>
                    </div>
                    <p className="text-gray-700">{blog.authorBio}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{blog.content}</p>
              </div>
            )}
            
            {/* Related Posts */}
            {blog.relatedPosts && blog.relatedPosts.length > 0 && (
              <div className="border-t pt-6 mt-8">
                <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blog.relatedPosts.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
