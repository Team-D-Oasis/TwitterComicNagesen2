import {useState, useEffect} from "react";
import firebase, {db} from "../Firebase";

export default function useUser() {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const f = async () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUser(user);
        } else {
          setUser(null)
        }
      });
    }

    f();
  })

  const login = async () => {
    const credential = await firebase.login()
    setUser(credential.user)
    db.collection("users").doc(credential.user?.uid).set({
      id: credential.user?.uid,
      name: credential.user?.displayName,
      iconURL: credential.user?.photoURL,
    }, { merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error: any) {
        console.error("Error writing document: ", error);
    });
  }

  const logout = async () => {
    await firebase.logout()
    setUser(null)
  }

  return {user, login, logout}
}