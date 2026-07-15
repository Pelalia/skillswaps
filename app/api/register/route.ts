import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/userSchema';
import clientPromise from '@/lib/db';
import { headers } from 'next/headers';
import { registerRateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
    try { 
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
        const {success} = await registerRateLimit.limit(ip);
        if(!success) return NextResponse.json({message: 'Too many requests, try again later'}, {status: 429})
        const body = await req.json();
        const res = registerSchema.safeParse(body)

        if (!res.success) {
            return NextResponse.json({message: 'Invalid input', errors: res.error.flatten().fieldErrors}, {status: 400})
        }
        const { username, password } = res.data;
        const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`
        
        const client = await clientPromise;
        const db = client.db('skillswaps');
        const users = db.collection('users');

        // Check if the username already exists
        const existingUser = await users.findOne({ username })
        if (existingUser) { 
            return NextResponse.json({message: 'Username already exists'}, {status: 409})
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 12)
        await users.insertOne({
            username,
            password: hashedPassword,
            avatarUrl,
            createdAt: new Date()
        })
        return NextResponse.json({message: 'User registered successfully'}, {status: 201})
    } catch (error) { 
        console.error('Error registering user:', error)
        return NextResponse.json({message: 'Internal server error'}, {status: 500})
    }
}