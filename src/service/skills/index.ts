/* eslint-disable @typescript-eslint/no-explicit-any */

// Get All Skills
// Get All Skills
export const getAllSkills = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/getallskills`, {
      method: "GET",
      cache: "no-store",
    });

    const json = await res.json();

    if (!json.success) throw new Error(json.message || "Failed to fetch skills");

    return json;
  } catch (error: any) {
    return { success: false, data: [], message: error.message };
  }
};

// Add Skill
export const addSkills = async (skillData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/create-skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skillData),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Skill
export const updateSkills = async (id: string, skillData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/updateskill/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skillData),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Skill
export const deleteSkills = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/deleteskill/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};