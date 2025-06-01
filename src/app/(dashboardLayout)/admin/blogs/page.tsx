import { AddBlog } from "@/components/modules/dashboard/blogs/AddBlog";
import BlogsTable from "@/components/modules/dashboard/blogs/blogsTable";
import { getAllBlogs } from "@/service/blog";
import { Blog } from "@/type/blogs";
import { handleDeleteBlogs, handleUpdateBlogs } from "./actions";


export default async function BlogsPage() {
    const res = await getAllBlogs();
    const blogs: Blog[] = res?.data || [];
  return (
    <div className="space-y-6 p-4" >
 <h1 className="text-center text-2xl md:text-3xl font-bold text-primary">
        Blogs Management
      </h1>
      <AddBlog />
    <BlogsTable 
  blogs={blogs} 
  onDelete={handleDeleteBlogs} 
  onUpdate={handleUpdateBlogs}
/>

    </div>
  )
}
