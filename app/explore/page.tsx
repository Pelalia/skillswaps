import { auth } from '@/auth'
import ExploreSearch from '@/components/exploreSearch'
import { getAllUsers } from '@/lib/users'
import { notFound } from 'next/navigation'


const Explore = async () => {
  const users = await getAllUsers()
  if (!users) notFound()
  
  const session = await auth()
  return (
    <div className="min-h-screen bg-green-50/40">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <ExploreSearch
          users={users.filter((u) => u.id !== session?.user?.id)}
        />
      </main>
    </div>
  );
}

export default Explore