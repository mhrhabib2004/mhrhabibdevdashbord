/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import UpdateBlogs from "./UpdateBlogs";
import { Blog } from "@/type/blogs";
import { useState } from "react";

interface BlogsTableProps {
  blogs: Blog[];
  onUpdate: (updatedblog: Blog) => Promise<{ success: boolean; message: string }>;
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
}

export default function BlogsTable({ blogs, onUpdate, onDelete }: BlogsTableProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const router = useRouter();

  const handleUpdate = async (updatedBlog: Blog) => {
    try {
      const result = await onUpdate(updatedBlog);
      if (result.success) {
        toast.success(result.message);
        setIsUpdateDialogOpen(false);
       router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleEditClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsUpdateDialogOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      const result = await onDelete(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Image</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <TableRow key={blog._id}>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>{blog.category || "Uncategorized"}</TableCell>
              <TableCell>
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={50}
                    height={30}
                    className="inline-block rounded-sm object-cover"
                  />
                ) : (
                  <span className="text-gray-400 italic">No image</span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Dialog 
                  open={isUpdateDialogOpen && selectedBlog?._id === blog._id} 
                  onOpenChange={setIsUpdateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="hover:bg-blue-100"
                      onClick={() => handleEditClick(blog)}
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl overflow-y-auto max-h-screen">
                    {selectedBlog && (
                      <UpdateBlogs 
                        blogs={selectedBlog} 
                        onUpdate={handleUpdate} 
                      />
                    )}
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this blog post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="px-4 py-3 text-center text-gray-500">
              No blogs found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}