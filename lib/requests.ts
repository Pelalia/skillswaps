import { swapRequest } from "@/types";
import clientPromise from "./db";
import { getUserById } from "./users";
import { ObjectId } from "mongodb";

export async function getRequests(userId: string) {
  const client = await clientPromise;
  const req = client.db("skillswaps").collection("requests");

  const incoming = await req.find({ toUserId: userId }).toArray();
  const outgoing = await req.find({ fromUserId: userId }).toArray();

  const enrichedIncoming = await Promise.all(
    incoming.map(async (r) => {
      const { _id, ...rest } = r;
      return {
        ...rest,
        id: _id.toString(),
        createdAt: r.createdAt?.toISOString(),
        fromUser: await getUserById(r.fromUserId.toString()),
        toUser: await getUserById(r.toUserId.toString()),
      };
    }),
  );

  const enrichedOutgoing = await Promise.all(
    outgoing.map(async (r) => {
      const { _id, ...rest } = r;
      return {
        ...rest,
        id: _id.toString(),
        createdAt: r.createdAt?.toISOString(),
        fromUser: await getUserById(r.fromUserId.toString()),
        toUser: await getUserById(r.toUserId.toString()),
      };
    }),
  );
  return { incoming: enrichedIncoming, outgoing: enrichedOutgoing };
}

export async function createRequest(data: {
  fromUserId: string;
  toUserId: string;
  message: string;
  offering: string[];
  wanting: string[];
}) {
  const client = await clientPromise;
  return client
    .db("skillswaps")
    .collection("requests")
    .insertOne({ ...data, status: "pending", createdAt: new Date() });
}

export async function updateRequest(id: string, data: Partial<swapRequest>) {
  const client = await clientPromise;
  return client
    .db("skillswaps")
    .collection("requests")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function getRequestById(id: string) {
  const client = await clientPromise;
  return client
    .db("skillswaps")
    .collection("requests")
    .findOne({ _id: new ObjectId(id) });
}