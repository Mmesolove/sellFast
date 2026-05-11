import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/validations";
import { apiError } from "@/lib/utils";

export async function PATCH(req: NextRequest) {
  const session = getCurrentUser();
  if (!session) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message);

    const user = await prisma.user.update({
      where: { id: session.userId },
      data: parsed.data,
      select: { id: true, email: true, businessName: true, whatsapp: true },
    });

    return Response.json({ user });
  } catch (err) {
    console.error("[UPDATE_PROFILE]", err);
    return apiError("Failed to update profile", 500);
  }
}
