/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/skills/actions.ts

"use server";

import { revalidatePath } from "next/cache";

import { deleteBlog, updateBlog } from "@/service/blog";
import { Blog } from "@/type/blogs";

export async function handleUpdateBlogs(updatedBlog: Blog) {
  try {
    const result = await updateBlog(updatedBlog._id, updatedBlog);
    if (!result.success) {
      throw new Error(result.message || "Failed to update Blog");
    }
    // revalidatePath("/admin/blogs"); 
    
    return { success: true, message: "Blog updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleDeleteBlogs(id: string) {
  try {
    const result = await deleteBlog(id);
    if (!result.success) {
      throw new Error(result.message || "Failed to delete skill");
    }
    revalidatePath("/admin/blogs");
    return { success: true, message: "Blog deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
