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
        const res = await axiosInterceptor.get("/users/me");
        return res.data;
    } catch (error: any) {
        console.error("Failed to get current user:", error);
        return null;
    }
}

