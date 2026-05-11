import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.errors[0].message);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return apiError("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return apiError("Invalid email or password", 401);
    }

    const token = signToken({ userId: user.id, email: user.email });
    setAuthCookie(token);

    return Response.json({
      user: { id: user.id, email: user.email, businessName: user.businessName },
    });
  } catch (err) {
    console.error("[LOGIN]", err);
    return apiError("Something went wrong. Please try again.", 500);
  }
}
