import { supabase } from "./supabase";

export type UserRole = "customer" | "rider" | "admin";

interface SignUpData {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    role?: UserRole;
}

export async function signUpWithEmail({
    email,
    password,
    fullName,
    phone,
    role = "customer",
}: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone: phone,
                role: role,
            },
        },
    });

    if (error) throw error;

    // Update profile with phone number (the SQL trigger handles the rest)
    if (data.user) {
        await supabase
            .from("profiles")
            .update({ phone: phone })
            .eq("id", data.user.id);
    }

    return data;
}

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getCurrentProfile() {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) throw error;
    return data;
}
