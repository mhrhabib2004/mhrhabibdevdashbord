/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddProject } from "@/components/modules/dashboard/projects/AddProjects";
import ProjectsTable from "@/components/modules/dashboard/projects/ProjectsTable";
import { getAllProjects, updateProjects, deleteProjects } from "@/service/project";
import { Project } from "@/type/project";
import { revalidatePath } from 'next/cache';

export default async function ProjectsPage() {
  const response = await getAllProjects();
  const projects: Project[] = response?.data || [];

  // Server Action for updating project
  const handleUpdateProject = async (updatedProject: Project) => {
    "use server";
    try {
      const result = await updateProjects(updatedProject._id, updatedProject);
      if (!result.success) {
        throw new Error(result.message || "Failed to update project");
      }
      revalidatePath('/admin/projects');
      return { success: true, message: "Project updated successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  // Server Action for deleting project
  const handleDeleteProject = async (projectId: string) => {
    "use server";
    try {
      const result = await deleteProjects(projectId);
      if (!result.success) {
        throw new Error(result.message || "Failed to delete project");
      }
      revalidatePath('/admin/projects');
      return { success: true, message: "Project deleted successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-primary">
        Project Management
      </h1>

      <AddProject />

      <ProjectsTable         
        projects={projects} 
        onUpdate={handleUpdateProject}
        onDelete={handleDeleteProject} 
      />
    </div>
  );
}