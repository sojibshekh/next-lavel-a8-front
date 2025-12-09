"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */


import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import axiosInterceptor from "./axios";
import { LoginCredentials } from "@/types/response";

// ==================== AUTH APIs ====================

// Login
export async function login(credentials: LoginCredentials) {
    try {
        const res = await axiosInterceptor.post("/auth/login", credentials);
        return res.data;
    } catch (error: any) {
        throw error;
    }
}

// Logout
export async function logout(): Promise<void> {
    try {
        await axiosInterceptor.post("/auth/logout");
    } catch (error) {
        console.error("Logout request failed:", error);
    } finally {
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
}

// Get current user
export async function getCurrentUser() {
    try {
        const res = await axiosInterceptor.get("/user/me");
        return res.data;
    } catch (error: any) {
        console.error("Failed to get current user:", error);
        return null;
    }
}

// ==================== PROJECTS APIs ====================

// ISR / SSG / SSR support: pass `revalidate` option
export async function fetchProjects(limit = 10, page = 1, revalidate?: number) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/project/all?page=${page}&limit=${limit}`,
            {
                next: revalidate ? { revalidate } : undefined,
            }
        );
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();

        return data;
    } catch (error: any) {
        console.error("Failed to fetch projects:", error?.message || error);
        return { data: [], meta: { total: 0, currentPage: page, limit } };
    }
}

export async function fetchProjectBySlug(slug: string, revalidate?: number) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/project/${slug}`,
            { next: revalidate ? { revalidate } : undefined }
        );
        if (!res.ok) throw new Error("Failed to fetch project by slug");
        return await res.json();
    } catch (error: any) {
        console.error("Failed to fetch project by slug:", error?.message || error);
        return null;
    }
}

// ==================== BLOGS APIs ====================
export async function fetchBlogs(limit = 10, page = 1) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blog/all?page=${page}&limit=${limit}`,
            { next: { tags: ["BLOG"] } }
        );
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Failed to fetch blogs:", error?.message || error);
        return { data: [], meta: { total: 0, currentPage: page, limit } };
    }
}

export async function fetchBlogBySlug(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`,
            { next: { tags: ["PROJECT"] } }
        );
        if (!res.ok) throw new Error("Failed to fetch blog by slug");
        return await res.json();
    } catch (error: any) {
        console.error("Failed to fetch blog by slug:", error?.message || error);
        return null;
    }
}

// ==================== MUTATION APIs (Admin only) ====================






async function getAuthToken() {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
}

// Create / Update / Delete Projects
export async function createProject(projectData: any) {
     const token = await getAuthToken();

     console.log("📦 Token sending:", token);
     console.log(`${process.env.NEXT_PUBLIC_API_URL}/project/create`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token || "" },
        credentials: "include",
        body: JSON.stringify(projectData),
    });
    revalidateTag("PROJECT");
    revalidatePath("/");
    if (!res.ok) throw new Error("Failed to create project");
    return await res.json();
}

export async function updateProject(slug: string, projectData: any) {
    const token = await getAuthToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token || "" },
        body: JSON.stringify(projectData),
    });
    revalidateTag("PROJECT");
    revalidatePath("/");
    if (!res.ok) throw new Error("Failed to update project");
    return await res.json();
}

export async function deleteProject(id: number) {
    const token = await getAuthToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
        method: "DELETE",
        headers: { Authorization: token || "" },
    });
    revalidateTag("PROJECT");
    revalidatePath("/");
    if (!res.ok) throw new Error("Failed to delete project");
    return await res.json();
}

// Create / Update / Delete Blogs
export async function createBlog(blogData: any) {
    const token = await getAuthToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token || "" },
        body: JSON.stringify(blogData),
    });
    revalidateTag("BLOG");
    revalidatePath("/");
    if (!res.ok) throw new Error("Failed to create blog");
    return await res.json();
}

export async function updateBlog(slug: string, blogData: any) {
    const token = await getAuthToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, {
        method: "PATCH",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},

        body: JSON.stringify(blogData),
    });
    revalidateTag("BLOG");
    revalidatePath("/");
    if (!res.ok) throw new Error("Failed to update blog");
    return await res.json();
}

export async function deleteBlog(id: number) {
    const token = await getAuthToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: token || "" },
    });
    revalidateTag("BLOG");
    revalidatePath("/");
    if (!res.ok) throw new Error("Failed to delete blog");
    return await res.json();
}