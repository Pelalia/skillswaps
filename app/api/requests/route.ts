import { auth } from '@/auth';
import { rateLimit } from '@/lib/rateLimit';
import { createRequest } from "@/lib/requests"
import { headers } from 'next/headers';
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const headersList = await headers()
        const ip = headersList.get('x-forwarded-for') ?? 'anonymous'
        const {success} = await rateLimit.limit(ip)
        const session = await auth()
        if(!success) return NextResponse.json({message: 'Too many requests, try again later'}, {status: 429})

        if(!session?.user?.id) return NextResponse.json({message: 'Unauthorized'}, {status: 401})
        const body = await req.json()
        
        const res = await createRequest({
           
            fromUserId: session.user.id,
            toUserId: body.toUserId,
            message: body.message,
            offering: body.offering,
            wanting: body.wanting
        })
        if(!res) return NextResponse.json({message: 'Something went wrong'}, {status: 500})
        return NextResponse.json({message: 'Request created'})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
}

 }