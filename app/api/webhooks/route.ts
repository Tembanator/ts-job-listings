// import  createUser  from "@/lib/users";
import { createUser } from "@/app/actions/userActions";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { email_addresses, first_name, id } = evt.data;
      await createUser({
        clerkUserId: id,
        email: email_addresses[0].email_address,
        name: first_name,
        isCompany: false, // Assuming companyId is optional
        isAdmin: false, // Default to false for new users
      } as User);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
