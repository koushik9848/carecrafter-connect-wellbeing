
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: {
    title: string;
    content: string;
    image: string;
    author: string;
    date: string;
  };
}

const BlogModal = ({ isOpen, onClose, blog }: BlogModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{blog.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="flex items-center text-sm text-gray-500">
              <span>{blog.author}</span>
              <span className="mx-2">•</span>
              <span>{blog.date}</span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{blog.content}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
