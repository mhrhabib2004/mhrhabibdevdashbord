/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addBlog } from "@/service/blog";
import { useRouter } from "next/navigation";
import { Toolbar } from "./Toolbar";


const blogSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  image: z.string().url({ message: "Enter a valid URL" }),
  content: z.string().min(1, { message: "Content is required" }),
  category: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export const AddBlog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      image: "",
      content: "",
      category: "",
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: "",
    onUpdate({ editor }) {
      form.setValue("content", editor.getHTML());
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      await addBlog(data);
      toast.success("Blog added successfully!");
      form.reset();
      editor?.commands.setContent(""); // Reset editor content
      router.refresh();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to add blog");
    }
  };

  return (
    <>
      <Button className="cursor-pointer" variant={"outline"} onClick={() => setOpen(true)}>Add Blog</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-screen overflow-y-auto max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image URL */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL*</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content with Tiptap */}
              <FormField
                control={form.control}
                name="content"
                render={() => (
                  <FormItem>
                    <FormLabel>Content*</FormLabel>
                    <FormControl>
                      <div className="border rounded-md">
                        <Toolbar editor={editor} />
                        <EditorContent editor={editor} className="min-h-[200px] px-4 py-2" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tech, Lifestyle, Travel..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit Blog
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
