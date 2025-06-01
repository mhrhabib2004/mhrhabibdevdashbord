/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addSkills } from "@/service/skills";
import { useRouter } from "next/navigation";

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
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
    const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISkill>({
    defaultValues: {
      category: SkillCategory.Technical,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setValue("image", data.secure_url, { shouldValidate: true });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit: SubmitHandler<ISkill> = async (data) => {
    try {
      await addSkills(data);
      toast.success("Skill added successfully!");
      reset();
      setOpen(false);
      router.refresh(); 
    } catch (error: any) {
      toast.error(error.message || "Failed to add skill");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Skill</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>Upload your skill with image.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) =>
                setValue("category", value as SkillCategory, { shouldValidate: true })
              }
              defaultValue={SkillCategory.Technical}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SkillCategory.Technical}>Technical</SelectItem>
                <SelectItem value={SkillCategory.Soft}>Soft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input type="file" onChange={handleImageUpload} />
            {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={uploading}>
              Add Skill
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
