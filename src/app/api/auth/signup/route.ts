import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";
import { apiError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.errors[0].message);
    }

    const { email, password, businessName, whatsapp } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return apiError("An account with this email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, businessName, whatsapp },
    });

    const token = signToken({ userId: user.id, email: user.email });
    setAuthCookie(token);

    return Response.json(
      { user: { id: user.id, email: user.email, businessName: user.businessName } },
      { status: 201 }
    );
  } catch (err) {
    console.error("[SIGNUP]", err);
    return apiError("Something went wrong. Please try again.", 500);
  }
}
