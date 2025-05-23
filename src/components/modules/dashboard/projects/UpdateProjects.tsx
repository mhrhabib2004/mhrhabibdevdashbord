"use client";

import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Project } from "@/type/project";


interface UpdateProjectsProps {
  project: Project;
  onUpdate: (data: Project) => void;
}

export default function UpdateProjects({ project, onUpdate }: UpdateProjectsProps) {
  const form = useForm<Project>({
    defaultValues: project,
  });

  const onSubmit = (data: Project) => {
    onUpdate(data);
    
    // toast.success("Project updated successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-4">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title*</FormLabel>
              <FormControl>
                <Input placeholder="Project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Live Link */}
        <FormField
          control={form.control}
          name="liveLink"
          rules={{
            required: "Live link is required",
            pattern: {
              value: /^https?:\/\/.+/,
              message: "Enter a valid URL",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Link*</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL */}
        <FormField
          control={form.control}
          name="image"
          rules={{
            required: "Image URL is required",
            pattern: {
              value: /^https?:\/\/.+/,
              message: "Enter a valid URL",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL*</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descriptions */}
        <FormField
          control={form.control}
          name="descriptions"
          rules={{ required: "Descriptions is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriptions*</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Project descriptions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GitHub Client */}
        <FormField
          control={form.control}
          name="githubClient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Client Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://github.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GitHub Server */}
        <FormField
          control={form.control}
          name="githubServer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Server Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://github.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tech Stack */}
        <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <FormControl>
                <Input placeholder="React, Node.js, MongoDB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Features */}
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Key features..." {...field} />
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
                <Input placeholder="E-commerce, Blog, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Video Demo */}
        <FormField
          control={form.control}
          name="videoDemo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Demo Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Team Project Switch */}
        <FormField
          control={form.control}
          name="isTeamProject"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
              <FormLabel className="mb-0">Team Project?</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Contributors */}
        <FormField
          control={form.control}
          name="contributors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contributors (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="John, Jane, Alex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update Project
        </Button>
      </form>
    </Form>
  );
}