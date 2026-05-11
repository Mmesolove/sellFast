import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { apiError, generateSlug } from "@/lib/utils";

export async function GET() {
  const session = getCurrentUser();
  if (!session) return apiError("Unauthorized", 401);

  const products = await prisma.product.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ products });
}

export async function POST(req: NextRequest) {
  const session = getCurrentUser();
  if (!session) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message);

    const { name, price, description, imageUrl } = parsed.data;

    // Ensure unique slug
    let slug = generateSlug(name);
    let attempts = 0;
    while (await prisma.product.findUnique({ where: { slug } }) && attempts < 5) {
      slug = generateSlug(name);
      attempts++;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description: description ?? null,
        imageUrl: imageUrl || null,
        slug,
        userId: session.userId,
      },
    });

    return Response.json({ product }, { status: 201 });
  } catch (err) {
    console.error("[CREATE_PRODUCT]", err);
    return apiError("Failed to create product", 500);
  }
}
