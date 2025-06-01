/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { ISkill } from "@/type/skill";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface SkillTableProps {
  skills: ISkill[];
  onUpdate: (updatedSkill: ISkill) => Promise<{ success: boolean; message: string }>;
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
}

export function SkillTable({ skills, onUpdate, onDelete }: SkillTableProps) {
  // Update handler passed down to UpdateSkill modal/component
  const handleUpdate = async (updatedSkill: ISkill) => {
    // const result = await onUpdate(updatedSkill);
  try {
      const result = await onUpdate(updatedSkill);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  // Delete handler when Trash button clicked
  const handleDelete = async (id: string) => {
       try {
      const result = await onDelete(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
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
          skills.map((skill) => (
            <TableRow key={skill._id || skill.name}>
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
                                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your project and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                         className="hover:bg-red-100"
                  onClick={() => handleDelete(skill._id!)}
                        
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="px-4 py-3 text-center text-gray-500">
              No Skills found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
