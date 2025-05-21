"use client";

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
import { useForm, SubmitHandler } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export enum SkillCategory {
  Technical = "Technical",
  Soft = "Soft",
}

export interface ISkill {
  name: string;
  category: SkillCategory;
  image: string;
}

export default function AddSkill() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ISkill>();

  const onSubmit: SubmitHandler<ISkill> = (data) => {
    console.log("Skill Submitted:", data);
    // handle skill post here
    reset(); // reset form
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end mr-8">
          <Button variant={"ghost"}>Add Skill</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>
            Please fill out the details of your skill.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">

          {/* Name */}
          <div>
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              className="bg-white mt-2 dark:bg-zinc-800"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value as SkillCategory)}>
              <SelectTrigger className="bg-white mt-2 dark:bg-zinc-800">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SkillCategory.Technical}>Technical</SelectItem>
                <SelectItem value={SkillCategory.Soft}>Soft</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">Category is required</p>
            )}
          </div>

          {/* Image */}
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              className="bg-white dark:bg-zinc-800"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Add Skill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
