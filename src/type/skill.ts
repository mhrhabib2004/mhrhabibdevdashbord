export enum SkillCategory {
  Technical = "Technical",
  Soft = "Soft",
}

export interface ISkill {
  _id:string,
  name: string;
  category: SkillCategory;
  image: string;
}
