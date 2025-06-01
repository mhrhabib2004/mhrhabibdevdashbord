/* eslint-disable @typescript-eslint/no-explicit-any */

// ✅ Get All Blogs
export const getAllBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "GET",
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ✅ Get Single Blog
export const getSingleBlog = async (id: string, userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
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

// ✅ Add Blog
export const addBlog = async (blogData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/create-blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add blog");
  }

  return await res.json();
};

// ✅ Update Blog
export const updateBlog = async (id: string, blogData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ✅ Delete Blog
export const deleteBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
