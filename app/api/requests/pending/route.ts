import { auth } from '@/auth'
import { apiRateLimit } from '@/lib/rateLimit';
import { getRequests } from '@/lib/requests'
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'


export async function GET() {
  try {
      const session = await auth();

      if (!session?.user?.id) return NextResponse.json({ count: 0 });
      const { incoming } = (await getRequests(session.user.id)) as any;
      const count = incoming.filter((r: any) => r.status === "pending").length;

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
    const {success} = await apiRateLimit.limit(ip);
    if(!success) return NextResponse.json({message: 'Too many requests, try again later'}, {status: 429})
       
      return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ count: 0 }, error as any);
  }
}