import bcrypt from "bcryptjs";
import clientPromise from "./db";
import { User } from "@/types";
import {ObjectId} from "mongodb";

export async function createUser(username: string, password: string) {
  const client = await clientPromise;
  const users = client.db("skillswaps").collection("users");

  const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`;
  const hashedPassword = await bcrypt.hash(password, 12);

  return users.insertOne({
    username,
    password: hashedPassword,
    avatarUrl,
    bio: "Hello, I am a new user",
    location: "Unknown",
    teach: [],
    learn: [],
    createdAt: new Date(),
  });
}

export async function getUserByUsername(username: string) {
  const client = await clientPromise;
  const escaped = username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const u = await client
    .db("skillswaps")
    .collection("users")
    .findOne({ username: {$regex: new RegExp(`^${escaped}$`, "i")} }); 

  if (!u) return null;

  return {
    id: u._id.toString(),
    username: u.username ?? "",
    avatarUrl:
      u.avatarUrl ??
      `https://api.dicebear.com/7.x/notionists/svg?seed=${u.username}`,
    bio: u.bio ?? "",
    location: u.location ?? "",
    teach: u.teach ?? [],
    learn: u.learn ?? [],
    createdAt: u.createdAt,
  };
}



export async function getAllUsers(): Promise<User[]> {
  const client = await clientPromise;
  const users = await client
    .db("skillswaps")
    .collection("users")
    .find({})
    .toArray();

  return users.map((u) => ({
    id: u._id.toString(),
    username: u.username ?? "",
    avatarUrl:
      u.avatarUrl ??
      `https://api.dicebear.com/7.x/notionists/svg?seed=${u.username}`,
    bio: u.bio ?? "",
    location: u.location ?? "",
    teach: u.teach ?? [],
    learn: u.learn ?? [],
    createdAt: u.createdAt?.toISOString() ?? new Date().toISOString(),
  }));
}

export async function updateUserProfile(username: string, data: Partial<User>) {
  const client = await clientPromise;
  return client
    .db("skillswaps")
    .collection("users")
    .updateOne({ username }, { $set: data });
}

export async function getUserById(id: string) {
  const client = await clientPromise
  const user = await client
    .db("skillswaps")
    .collection("users")
    .findOne(
        ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { oauthId: id },);
  
  if (!user) {
    return null; 
  }

  return {
    id: user._id.toString(),
    username: user.username ?? "",
    avatarUrl:
      user.avatarUrl ??
      `https://api.dicebear.com/7.x/notionists/svg?seed=${user.username}`,
    bio: user.bio ?? "",
    location: user.location ?? "",
    teach: user.teach ?? [],
    learn: user.learn ?? [],
    createdAt: user.createdAt?.toISOString(),
  };
}

export async function updateUser(id: string, data: Partial<User>) {
  const client = await clientPromise
  return client.db("skillswaps").collection("users").updateOne({ _id: new ObjectId(id) }, { $set: data });
}