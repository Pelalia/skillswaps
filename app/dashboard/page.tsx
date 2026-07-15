import { auth } from '@/auth'
import DashboardClient from '@/components/dashboardClient'
import { getRequests } from '@/lib/requests'
import { getUserById } from '@/lib/users'
import { EnrichedSwapRequest } from '@/types'
import { notFound, redirect } from 'next/navigation'


const Dashboard
  = async () => {
    const session = await auth()
    if (!session?.user?.id) redirect("/login");
    const user = await getUserById(session.user.id)
    if (!user) notFound()
    const res = (await getRequests(session.user.id)) as unknown as {
      incoming: EnrichedSwapRequest[]
      outgoing: EnrichedSwapRequest[]
    }
    const pendingCount = res.incoming.filter(r => r.status === 'pending').length
  return (
      <main >
      <DashboardClient users={user} pendingCount={ pendingCount} />
      </main>
  );
}

export default Dashboard
