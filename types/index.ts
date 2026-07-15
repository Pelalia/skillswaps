export type skill = string;
export interface User {
  username: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  teach: skill[];
  learn: skill[];
  id: string;
    createdAt: string;
}

export interface swapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  offering: skill[];
  wanting: skill[];
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface EnrichedSwapRequest extends swapRequest {
  fromUser?: User | null
  toUser?: User | null,

}