

import { auth } from "@/auth";
import { apiRateLimit } from "@/lib/rateLimit";
import { updateUser } from "@/lib/users";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateProfileSchema = z.object({
    bio: z.string().max(300, 'Bio must be less than 300 characters').optional(),
    location: z.string().max(100, 'Location must be less than 100 characters').optional(),
    teach: z.array((z.string().max(50, 'Teach must be less than 50 characters'))).max(5, 'You can only teach up to 5 skills').optional(),
    learn: z.array((z.string().max(50, 'Learn must be less than 50 characters'))).max(5, 'You can only learn up to 5 skills').optional(),
})
export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}) {
    try {
        const session = await auth()



        if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        const { id } = await params
        if (session.user.id !== (await params).id)
          return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        
        const body = await req.json();
        const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
        const {success} = await apiRateLimit.limit(ip);
        if (!success) return NextResponse.json({ message: 'Too many requests, try again later' }, { status: 429 })
        
        
        const res = updateProfileSchema.safeParse(body)
        if (!res.success) {
            return NextResponse.json({message: 'Invalid input', errors: res.error.flatten().fieldErrors}, {status: 400})
        }
        await updateUser(id, res.data)
        
        if(!res) return NextResponse.json({message: 'Something went wrong'}, {status: 500})

        return NextResponse.json({message: 'Request updated'})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
   }
  
}