import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

async function getRoommates(uid: any) {
  //get roommates
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  let roommateArray: any = [];
  if (docSnap.exists()) {
    const docRef1 = doc(db, "groups", docSnap.data().group);
    const docSnap1 = await getDoc(docRef1);
    if (docSnap1.exists()) {
      const memberArray = docSnap1.data().members;
      const promises = memberArray.map(async (id: any) => {
        const docRef2 = doc(db, "users", id);
        const docSnap2 = await getDoc(docRef2);
        if (docSnap2.exists()) {
          roommateArray.push({
            name: docSnap2.data().username,
            points: docSnap2.data().points,
          });
        }
      });
      await Promise.all(promises);

      return roommateArray.sort(
        (a: { points: number }, b: { points: number }) => b.points - a.points
      );
    } else {
      console.log("group does not exist");
    }
  } else {
    console.log("user does not exist");
  }
}
async function updateScore(uid: any, count: number) {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    points: increment(count),
  });
}
async function getName(uid: any) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().username;
  }
}
async function getGroupId(uid: any) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().group;
  }
}

async function addRoommate(groupid: any, email: any, username: any, passcode:any){
  //add roommate to groups.document.members

  //add roommate to authentication

  //add roommate to users document
}
export { getRoommates, updateScore, getName,getGroupId };
