"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// ... rest of your code

interface ProjectFormData {
  title: string;
  descriptions: string;
  liveLink: string;
  image?: string;
  githubClient?: string;
  githubServer?: string;
  techStack?: string[];
  features?: string[];
  category?: string;
  isTeamProject?: boolean;
  contributors?: string[];
  videoDemo?: string;
}

export default function AddProjects() {
  const { register, handleSubmit, formState: { errors },control} = useForm<ProjectFormData>();

  const onSubmit = (data: ProjectFormData) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end mr-8">
          <Button variant={"ghost"}>Add Projects</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Projects</DialogTitle>
          <DialogDescription>
            Please fill out the details of your Projects.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Project Title*</Label>
            <Input
              id="title"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="descriptions">Description*</Label>
            <Textarea
              id="descriptions"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("descriptions", { required: "Description is required" })}
            />
            {errors.descriptions && (
              <p className="text-red-500 text-sm">{errors.descriptions.message}</p>
            )}
          </div>

          {/* Live Link */}
          <div>
            <Label htmlFor="liveLink">Live Link*</Label>
            <Input
              id="liveLink"
              type="url"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("liveLink", { required: "Live link is required" })}
            />
            {errors.liveLink && (
              <p className="text-red-500 text-sm">{errors.liveLink.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("image")}
            />
          </div>

          {/* GitHub Client */}
          <div>
            <Label htmlFor="githubClient">GitHub Client Link</Label>
            <Input
              id="githubClient"
              type="url"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("githubClient")}
            />
          </div>

          {/* GitHub Server */}
          <div>
            <Label htmlFor="githubServer">GitHub Server Link</Label>
            <Input
              id="githubServer"
              type="url"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("githubServer")}
            />
          </div>

          {/* Tech Stack */}
          <div>
            <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
            <Input
              id="techStack"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("techStack")}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          {/* Features */}
          <div>
            <Label htmlFor="features">Features (comma separated)</Label>
            <Textarea
              id="features"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("features")}
              placeholder="User authentication, CRUD operations, Responsive design"
            />
          </div>

          {/* Category */}
          <div>
        <Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="bg-white mt-2 dark:bg-zinc-800">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="web">Web Application</SelectItem>
        <SelectItem value="mobile">Mobile Application</SelectItem>
        <SelectItem value="desktop">Desktop Application</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
          </div>

          {/* Is Team Project */}
          <div className="flex items-center space-x-2">
            <Checkbox id="isTeamProject" {...register("isTeamProject")} />
            <Label htmlFor="isTeamProject">Team Project</Label>
          </div>

          {/* Contributors */}
          <div>
            <Label htmlFor="contributors">Contributors (comma separated)</Label>
            <Input
              id="contributors"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("contributors")}
              placeholder="John Doe, Jane Smith"
            />
          </div>

          {/* Video Demo */}
          <div>
            <Label htmlFor="videoDemo">Video Demo URL</Label>
            <Input
              id="videoDemo"
              type="url"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("videoDemo")}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}