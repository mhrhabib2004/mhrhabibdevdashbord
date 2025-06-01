/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Blog } from "@/type/blogs";
import { z } from "zod";
import { Toolbar } from "./Toolbar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
  category: z.string().optional(),
});

type BlogSchema = z.infer<typeof blogSchema>;

interface UpdateBlogsProps {
  blogs: Blog;
  onUpdate: (data: Blog) => Promise<any>; // ✅ server action call
}

export default function UpdateBlogs({ blogs, onUpdate }: UpdateBlogsProps) {
  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blogs.title || "",
      content: blogs.content || "",
      image: blogs.image || "",
      category: blogs.category || "",
    },
    shouldUnregister: true,
  });

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: blogs.content || "", // ✅ Set initial content
    onUpdate({ editor }) {
      form.setValue("content", editor.getHTML());
    },
  });

  const onSubmit = async (data: BlogSchema) => {
    const updatedBlog: Blog = {
      ...blogs,
      ...data,
    };
    await onUpdate(updatedBlog);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto p-4"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title*</FormLabel>
              <FormControl>
                <Input placeholder="Blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormLabel>Content*</FormLabel>
              <FormControl>
                {editor ? (
                  <div className="border rounded-md">
                    <Toolbar editor={editor} />
                    <EditorContent editor={editor} className="min-h-[200px] px-4 py-2" />
                  </div>
                ) : (
                  <p>Loading editor...</p>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
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

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g. React, Travel, Health" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Updating..." : "Update Blog"}
        </Button>
      </form>
    </Form>
  );
}
