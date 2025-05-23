/* eslint-disable @typescript-eslint/no-explicit-any */

// ✅ Get All Projects
export const getAllProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "GET",
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ✅ Get Single Project
export const getSingleProjects = async (id: string, userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ✅ Add Project
export const addProjects = async (projectData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/create-project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add project");
  }

  return await res.json();
};

// ✅ Update Project
export const updateProjects = async (id: string, projectData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
      method: "PATCH", // Fixed typo from "FATCH" to "PATCH"
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ✅ Delete Project
export const deleteProjects = async (id: string) => { // Fixed typo from "deletedProjects" to "deleteProjects"
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};