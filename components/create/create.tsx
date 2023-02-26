import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import "firebase/firestore";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase/initFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import router, { useRouter } from "next/router";

const StyledCreate = styled.div`
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(89, 139, 213, 1) 100%
  );
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function Create() {
  const firstRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passcodeRef = useRef<any>(null);
  const taskRef = useRef<any>(null);
  const pointRef = useRef<any>(null);
  const [nameArray, setNameArray] = useState<any>([]);
  const [taskList, setTaskList] = useState<any>([]);
  const [authArray, setAuthArray] = useState<any>([]);
  const [userArray, setUserArray] = useState<any>([]);

  async function createGroup() {
    const groupCollectionRef = collection(db, "groups");

    const groupDocRef = await addDoc(groupCollectionRef, {
      members: [],
      tasks: taskList,
    });
    return groupDocRef.id;
  }

  async function addUser(
    groupId: any,
    emailinput: any,
    usernameinput: any,
    uid: any
  ) {
    try {
      console.log("uid", uid);
      await setDoc(doc(db, "users", uid), {
        email: emailinput,
        group: groupId,
        points: 0,
        username: usernameinput,
      });
      // console.log("id", groupDocRef.id);
      return uid;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (event: any) => {
    console.log("handleSubmit ran");
    event.preventDefault(); // 👈️ prevent page refresh
    let newArray = [...nameArray, firstRef.current.value];
    setNameArray(newArray);
    newArray = [
      ...userArray,
      {
        email: emailRef.current.value,
        password: passcodeRef.current.value,
        username: firstRef.current.value,
        uid: "",
      },
    ];
    setUserArray(newArray);
    if (
      emailRef.current != null &&
      passcodeRef.current != null &&
      firstRef.current != null
    ) {
      fetchSignInMethodsForEmail(auth, emailRef.current.value).then(
        (result) => {
          if (result.length > 0) {
            const errorMessage = "This user already exists";
            console.log("failure");
            alert(errorMessage);
            setNameArray(nameArray);
          }
        }
      );
    }

    event.target.reset();
  };
  const addTask = (event: any) => {
    event.preventDefault(); // 👈️ prevent page refresh
    if (taskRef.current != null && pointRef.current != null) {
      const newArray = [
        ...taskList,
        {
          task: taskRef.current.value,
          points: pointRef.current.value,
          claimed: false,
        },
      ];
      setTaskList(newArray);
    }

    event.target.reset();
  };
  const handleClick = async () => {
    console.log(authArray);
    router.push("../signin");
    let idArray:any={};
    const promises: any[] = [];
    userArray.forEach((element: any) => {
      // createUserWithEmailAndPassword(auth, element.email, element.password)
      //   .then((userCredential) => {
      //     idArray.push(userCredential.user.uid);
      //     promises.push(userCredential);
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log("failure");
      //     alert(errorMessage);
      //   });
      const promise = new Promise<void>((resolve, reject) => {
        createUserWithEmailAndPassword(auth, element.email, element.password)
          .then((userCredential) => {
            idArray[element.username]=userCredential.user.uid;
            
            resolve();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("failure");
            alert(errorMessage);
            reject(error);
          });
          
      });
      promises.push(promise);
    });
    await Promise.all(promises);
    console.log("idarray", idArray);
    let groupId = await createGroup();
    let memberArray: any[] = [];
    console.log(userArray);
    for (let i = 0; i < userArray.length; i++) {
      const memberId = await addUser(
        groupId,
        userArray[i].email,
        userArray[i].username,
        idArray[userArray[i].username]
      );
      console.log("member id", memberId);
      memberArray.push(memberId);
    }
    console.log("blah");
    console.log("member array", memberArray);
    console.log("groupId:", groupId);
    const groupDocRef = doc(db, "groups", groupId);
    await updateDoc(groupDocRef, {
      members: memberArray,
    });
  };

  return (
    <StyledCreate>
      <InputContainer>
        <HeaderText>
          Create New <BlueText>Roomi</BlueText> Group
        </HeaderText>
        {userArray.map((user: any) => (
          <UserText>{user.username}</UserText>
        ))}
        {taskList.map((task: any) => (
          <UserText>{task.task}</UserText>
        ))}
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Input
              style={{ margin: 5 }}
              placeholder="name"
              ref={firstRef}
              type="name"
              id="name"
              name="name"
              required
            />
            <Input
              style={{ margin: 5 }}
              ref={emailRef}
              placeholder="email"
              type="email"
              id="email"
              name="email"
              required
            />
            <Input
              style={{ margin: 5 }}
              placeholder="passcode"
              ref={passcodeRef}
              type="password"
              id="passcode"
              name="passcode"
              required
            />
            <InputButton
              style={{ margin: 5, width: 130 }}
              type="submit"
              id="submit"
              value="Add Roommate"
            >
              Add Roomi
            </InputButton>
          </Form>
          <Form onSubmit={addTask}>
            <Input
              style={{ margin: 5 }}
              placeholder="task"
              ref={taskRef}
              type="text"
              id="task"
              name="task"
              required
            />
            <Input
              style={{ margin: 5 }}
              placeholder="points"
              ref={pointRef}
              type="text"
              id="points"
              name="points"
              required
            />
            <InputButton
              style={{ margin: 5, width: 130 }}
              type="submit"
              id="submit"
              value="Add Task"
            >
              Add Task
            </InputButton>
          </Form>
          <GradientButton onClick={handleClick}>
            Create New Account
          </GradientButton>
        </FormContainer>
      </InputContainer>
    </StyledCreate>
  );
}

export default Create;

const UserText = styled.p`
  position: relative;
  top: 30px;
  border: 1px solid #dcdcdc;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  width: 30%;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background-color: white;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  margin: 5px;
`;
const InputButton = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: #4299e1;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  line-height: 26px;
`;
const GradientButton = styled.button`
  width: 150px;
  padding: 0;
  border: none;
  background: linear-gradient(
    90deg,
    rgba(151, 193, 255, 1) 0%,
    rgba(57, 130, 238, 1) 100%
  );
  color: white;
  border-radius: 0.3rem;
  font-family: Intervariable, sans-serif;
  padding: 10px 15px;
  width: 50%;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 30px;
  margin: 20px;
`;
const BlueText = styled.span`
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  color: #0056d6;
`;
const InputContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 4px solid rgba(255, 255, 255, 0.5);
`;
const Input = styled.input`
  border: solid 0.1rem #bcbcbc;
  background-color: #f8f8f8;
  border-radius: 0.3rem;
  padding: 10px;
  padding-left: 15px;
  font-family: InterVariable, sans-serif;
  font-size: 1.1rem;
  color: #676767;
  width: 100%;
  margin-top: 1rem;

  ::placeholder {
    color: #bcbcbc;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #bcbcbc;
  }
`;
const HeaderText = styled.div`
  color: black;
  font-size: 1.5em;
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  position: relative;
  top: 30px;
`;
const SubText = styled.div`
  color: grey;
  margin: 10px;
  font-size: 1em;
`;
const FormContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;
const Form = styled.form`
  /* position: relative;
  bottom: 10%;
  width: 60%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;
