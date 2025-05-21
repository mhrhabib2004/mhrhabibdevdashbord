/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import UpdateSkill from "./UpdateSkill";


const skills = [
  {
    name: "JavaScript",
    category: "Technical",
    image: "/images/skills/javascript.png",
  },
  {
    name: "Teamwork",
    category: "Soft",
    image: "/images/skills/teamwork.png",
  },
];

export function SkillTable() {
  const handleUpdate = (updatedSkill: any) => {
    // Implement your update logic here
    console.log("Updated skill:", updatedSkill);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Skill</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Icon</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{skill.name}</TableCell>
              <TableCell>{skill.category}</TableCell>
              <TableCell>
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={24}
                  height={24}
                  className="inline-block rounded-sm"
                />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <UpdateSkill skill={skill} onUpdate={handleUpdate}>
                  <Button variant="outline" size="icon" className="hover:bg-blue-100">
                    <Pencil size={16} className="text-blue-600" />
                  </Button>
                </UpdateSkill>
                <Button variant="outline" size="icon" className="hover:bg-red-100">
                  <Trash2 size={16} className="text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className="px-4 py-3 text-center text-gray-500"
            >
              No Skills found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}