// app/admin/skills/page.tsx

import AddSkill from "@/components/modules/dashboard/Skills/AddSkill";
import { SkillTable } from "@/components/modules/dashboard/Skills/SkillsTable";
import { getAllSkills } from "@/service/skills";
import { ISkill } from "@/type/skill";

import { handleUpdateSkills, handleDeleteSkill } from "./actions";

export default async function SkillPage() {
  const res = await getAllSkills();
  const skills: ISkill[] = res?.data || [];

  return (
    <div className="space-y-6 p-4">
       <h1 className="text-center text-2xl md:text-3xl font-bold text-primary">
        Skills Management
      </h1>
      <AddSkill />
      <SkillTable 
        skills={skills}
        onUpdate={handleUpdateSkills}  
        onDelete={handleDeleteSkill}  
      />
    </div>
  );
}
