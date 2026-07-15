import { auth } from "@/auth";
import { updateRequest } from "@/lib/requests";
import { NextResponse } from "next/server";
import z from "zod";

const updateRequestSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]),
});
import { getRequestById } from "@/lib/requests"; // ← à créer

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    // Vérifie que le user est bien le destinataire de la request
    const existingRequest = await getRequestById(id);
    if (!existingRequest)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    if (existingRequest.toUserId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const res = updateRequestSchema.safeParse(body);
    if (!res.success)
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });

    await updateRequest(id, res.data);
    return NextResponse.json({ message: "Request updated" });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}