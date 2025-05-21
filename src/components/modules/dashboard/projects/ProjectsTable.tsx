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

const projects = [
  {
  "title": "MediCare - Online Medicine Store",
  "descriptions": "MediCare is a multi-vendor e-commerce platform where users can easily order medicines online. It's a fully featured project including user, vendor, and admin dashboards.",
  "liveLink": "https://medicare.vercel.app",
  "image": "/images/projects/medicare.png",
  "githubClient": "https://github.com/mhrhabib2004/medicare-client",
  "githubServer": "https://github.com/mhrhabib2004/medicare-server",
  "techStack": [
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "JWT",
    "Redux Toolkit",
    "Stripe"
  ],
  "features": [
    "User authentication with JWT",
    "Product filtering and search",
    "Add to cart and order management",
    "Stripe payment integration",
    "Multi-vendor support",
    "Dashboard and role-based access"
  ],
  "createdAt": "2024-06-01T10:30:00Z",
  "updatedAt": "2024-07-15T15:45:00Z",
  "category": "E-Commerce",
  "isTeamProject": true,
  "contributors": [
    "Md. Habibur Rahman Habib",
    "Samiul Haque",
    "Jannat Ara"
  ],
  "videoDemo": "https://www.youtube.com/watch?v=your-demo-link"
}

];

export default function ProjectsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>title</TableHead>
          <TableHead>liveLink</TableHead>
          <TableHead>image</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects && projects.length > 0 ? (
          projects.map((projects, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{projects?.title}</TableCell>
              <TableCell>{projects?.liveLink}</TableCell>
              <TableCell>
                <Image
                  src={projects.image}
                  alt={projects.title}
                  width={24}
                  height={24}
                  className="inline-block rounded-sm"
                />
              </TableCell>
              <TableCell className="text-right space-x-2">
                {/* <UpdateSkill skill={skill} onUpdate={handleUpdate}>
                  <Button variant="outline" size="icon" className="hover:bg-blue-100">
                    <Pencil size={16} className="text-blue-600" />
                  </Button>
                </UpdateSkill> */}
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
  )
}
