import { db } from "../firebase/initFirebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

async function getTasks(uid: any) {
  //get group from uid
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  //if group exists

  //get tasks
  if (docSnap.exists()) {
    console.log("group exists");
    //return tasks
    const docRef1 = doc(db, "groups", docSnap.data().group);
    const docSnap1 = await getDoc(docRef1);
    if (docSnap1.exists()) {
      return docSnap1.data().tasks;
    } else {
      console.log("group does not exist");
    }
  } else {
    // doc.data() will be undefined in this case
    console.log("user does not exist");
  }
}

async function updateTasks(groupid: any, index: number) {
  const docRef = doc(db, "groups", groupid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let updatedTasks = docSnap.data().tasks;
    updatedTasks[index].claimed = true;
    await updateDoc(docRef, {
      tasks: updatedTasks,
    });
  } else {
    console.log("group does not exist");
  }
}

async function addTask(groupid: any, taskName: string, pointValue: number) {
  const docRef = doc(db, "groups", groupid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let updatedTasks = [...docSnap.data().tasks];
    updatedTasks.push({ task: taskName, points: pointValue });
    await updateDoc(docRef, {
      tasks: updatedTasks,
    });
  } else {
    console.log("group does not exist");
  }
}

async function deleteTask(groupid: any, deleteName: string) {
  const docRef = doc(db, "groups", groupid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let updatedTasks = [...docSnap.data().tasks];
    updatedTasks = updatedTasks.filter((element) => element.task !== deleteName)
    await updateDoc(docRef, {
      tasks: updatedTasks,
    });
  } else {
    console.log("group does not exist");
  }
}
export { getTasks, updateTasks, addTask,deleteTask};
