/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/skills/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { deleteSkills, updateSkills } from "@/service/skills";
import { ISkill } from "@/type/skill";

export async function handleUpdateSkills(updatedSkills: ISkill) {
  try {
    const result = await updateSkills(updatedSkills._id, updatedSkills);
    if (!result.success) {
      throw new Error(result.message || "Failed to update skill");
    }
    revalidatePath("/admin/skills");
    return { success: true, message: "Skill updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleDeleteSkill(id: string) {
  try {
    const result = await deleteSkills(id);
    if (!result.success) {
      throw new Error(result.message || "Failed to delete skill");
    }
    revalidatePath("/admin/skills");
    return { success: true, message: "Skill deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
