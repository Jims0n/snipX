'use server';

import { signOut as nextAuthSignOut } from "@/auth";

export async function handleSignOut() {
  await nextAuthSignOut();
} 