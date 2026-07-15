import { auth } from "@/auth";
import RequestsTabs from "@/components/RequestsTabs";
import { getRequests } from "@/lib/requests";
import { EnrichedSwapRequest } from "@/types";

import { redirect } from "next/navigation";

export default async function RequestsPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");
  const { incoming, outgoing } = (await getRequests(
    session.user.id,
  )) as unknown as {
    incoming: EnrichedSwapRequest[];
    outgoing: EnrichedSwapRequest[];
  };

  return <RequestsTabs incoming={incoming} outgoing={outgoing} />;
}
