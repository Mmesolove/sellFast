import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { apiError, generateSlug } from "@/lib/utils";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const session = getCurrentUser();
  if (!session) return apiError("Unauthorized", 401);

  const product = await prisma.product.findFirst({
    where: { id: params.id, userId: session.userId },
  });

  if (!product) return apiError("Product not found", 404);
  return Response.json({ product });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = getCurrentUser();
  if (!session) return apiError("Unauthorized", 401);

  try {
    const existing = await prisma.product.findFirst({
      where: { id: params.id, userId: session.userId },
    });
    if (!existing) return apiError("Product not found", 404);

    const body = await req.json();
    const parsed = productSchema.partial().safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message);

    const data: Record<string, unknown> = { ...parsed.data };

    // Regenerate slug if name changed
    if (parsed.data.name && parsed.data.name !== existing.name) {
      let slug = generateSlug(parsed.data.name);
      let attempts = 0;
      while (
        (await prisma.product.findFirst({ where: { slug, NOT: { id: params.id } } })) &&
        attempts < 5
      ) {
        slug = generateSlug(parsed.data.name);
        attempts++;
      }
      data.slug = slug;
    }

    if (data.imageUrl === "") data.imageUrl = null;

    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });

    return Response.json({ product });
  } catch (err) {
    console.error("[UPDATE_PRODUCT]", err);
    return apiError("Failed to update product", 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = getCurrentUser();
  if (!session) return apiError("Unauthorized", 401);

  const existing = await prisma.product.findFirst({
    where: { id: params.id, userId: session.userId },
  });
  if (!existing) return apiError("Product not found", 404);

  await prisma.product.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
