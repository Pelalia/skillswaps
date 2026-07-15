import Hero from '@/components/hero'
import { getAllUsers } from '@/lib/users'

const page = async () => {
  const users = await getAllUsers()
  const featured = users.slice(0, 3)
  return (
    <div className="bg-green-50/40">
      <Hero featured={featured} />
    </div>
  );
}

export default page


