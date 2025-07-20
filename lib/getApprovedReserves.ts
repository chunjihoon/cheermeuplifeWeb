// // lib/reviews.ts
// import { db } from "@/lib/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// // 명확한 타입 정의
// export interface Reserves {
//   id: string;
//   service: string;
//   name: string;
//   contact: string;
//   date: string;
//   time: string;
//   region: string;
//   people: string;
//   request: string;
// }

// export async function getApprovedReviews(): Promise<Reserves[]> {
//   const q = query(collection(db, "reserves"), where("isApproved", "==", true));
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...(doc.data() as Omit<Reserves, "id">),
//   }));
// }
