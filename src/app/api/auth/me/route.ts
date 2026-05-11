import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/utils";

export async function GET() {
  const session = getCurrentUser();
  if (!session) return apiError("Unauthorized", 401);

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, businessName: true, whatsapp: true, createdAt: true },
  });

  if (!user) return apiError("User not found", 404);
  return Response.json({ user });
}
