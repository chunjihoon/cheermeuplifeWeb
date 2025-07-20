// lib/reviews.ts
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// 명확한 타입 정의
export interface Review {
  id: string;
  name: string;
  song: string;
  date: string;
  count: string;
  content: string;
  isApproved: boolean;
}

export async function getApprovedReviews(): Promise<Review[]> {
  const q = query(collection(db, "reviews"), where("isApproved", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Review, "id">),
  }));
}
