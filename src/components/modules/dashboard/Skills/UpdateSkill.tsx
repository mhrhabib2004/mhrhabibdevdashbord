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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

export enum SkillCategory {
  Technical = "Technical",
  Soft = "Soft",
}

export interface ISkill {
  name: string;
  category: SkillCategory;
  image: string;
}

interface UpdateSkillProps {
  skill: ISkill;
  onUpdate: (updatedSkill: ISkill) => void;
  children: ReactNode;
}

export default function UpdateSkill({ skill, onUpdate, children }: UpdateSkillProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISkill>({
    defaultValues: skill,
  });

  useEffect(() => {
    if (skill) {
      reset(skill);
    }
  }, [skill, reset, open]); // Added open to dependencies

  const onSubmit: SubmitHandler<ISkill> = (data) => {
    onUpdate(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Skill</DialogTitle>
          <DialogDescription>Update your skill information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              className="bg-white dark:bg-zinc-800"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              defaultValue={skill.category}
              onValueChange={(value) => {
                setValue("category", value as SkillCategory);
              }}
            >
              <SelectTrigger className="bg-white dark:bg-zinc-800">
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
            <Button type="submit">Update Skill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}