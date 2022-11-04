
import firebase from 'firebase/app'
import 'firebase/firestore'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase/initFirebase'

export interface WriteToCloudFirestoreProps {
    email: string,
    id: number,
    username: string
}

const WriteToCloudFirestore = (props: WriteToCloudFirestoreProps) => {
    const sendData = async () => {
        try {
            await setDoc(doc(db, "users", "user5"), {
                email: "drake@gmail.com",
                id: props,
                points: 0,
                username: "drake"
              });
            alert ('Data was succesfully updated')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
            <button onClick={sendData} style={{ width: '100%', marginTop:40 }}>Send Data To Cloud Firestore</button>
            // <input style={{margin: 40, width: 90}} type="submit" id="submit" value="create user"/>
    )
}

export default WriteToCloudFirestore