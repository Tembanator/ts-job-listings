"use server";

import { updateUserByClerkId } from "@/app/actions/userActions";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role: formData.get("role"),
      },
    });

    await updateUserByClerkId(userId, {
      isCompany: (formData.get("role") as string) === "company",
    });

    return { message: res.publicMetadata };
  } catch (err) {
    console.log(err);
    return { error: "There was an error updating the user metadata." };
  }
};
