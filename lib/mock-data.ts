import type { User, swapRequest } from "@/types";

export const seedUsers: User[] = [
  {
    id: "u1",
    username: "Pelalia Moreau",
    bio: "Frontend developer passionate about clean code and learning new design crafts.",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Pelalia",
    location: "Paris, FR",
    teach: ["React", "JavaScript", "Tailwind CSS"],
    learn: ["UI Design", "Figma"],
    createdAt: new Date(),
  },
  {
    id: "u2",
    username: "Kenji Tanaka",
    bio: "Product designer who loves typography. Looking to deepen my coding skills.",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Kenji",
    location: "Tokyo, JP",
    teach: ["UI Design", "Figma", "Branding"],
    learn: ["React", "Node.js"],
    createdAt: new Date(),
  },
  {
    id: "u3",
    username: "Amara Diallo",
    bio: "Full-stack engineer based in Dakar. I teach Node, I want to learn motion design.",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Amara",
    location: "Dakar, SN",
    teach: ["Node.js", "MongoDB", "TypeScript"],
    learn: ["Motion Design", "After Effects"],
    createdAt: new Date(),
  },
  {
    id: "u4",
    username: "Sofia Rivera",
    bio: "Spanish teacher and language nerd. Learning to code my own portfolio.",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Sofia",
    location: "Madrid, ES",
    teach: ["Spanish", "French", "Copywriting"],
    learn: ["HTML", "CSS"],
    createdAt: new Date(),
  },
  {
    id: "u5",
    username: "Lucas Bernard",
    bio: "Data analyst, weekend photographer. Trade me Python tips for portrait lighting.",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Lucas",
    location: "Lyon, FR",
    teach: ["Python", "SQL", "Data Viz"],
    learn: ["Photography", "Lightroom"],
    createdAt: new Date(),
  },
  {
    id: "u6",
    username: "Mei Chen",
    bio: "iOS developer. I want to swap Swift lessons for guitar lessons.",
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Mei",
    location: "Berlin, DE",
    teach: ["Swift", "iOS", "SwiftUI"],
    learn: ["Guitar", "Music Theory"],
    createdAt: new Date(),
  },
];

export const seedRequests: swapRequest[] = [
  {
    id: "r1",
    fromUserId: "u2",
    toUserId: "u1",
    message:
      "Hi! I'd love to learn React from you. I can teach you Figma in exchange.",
    offering: ["Figma"],
    wanting: ["React"],
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];
