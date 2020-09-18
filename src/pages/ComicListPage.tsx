import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { useParams } from "react-router-dom";
import Comics from '../components/ComicList';
import UserCard from '../components/UserCard';

export default function ComicListPage() {
  const { userId } = useParams<{userId: string}>();
  const [userRef, setUserRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();
  let black:string="#000000"

  useEffect(() => {
    console.log(userId);

    const authorRef = db.collection("users").doc(userId);
    setUserRef(authorRef);
  }, [])

  return (
    <>
      <div style={{padding: "16px"}}>
        <UserCard userRef={userRef} color={black}/>
      </div>
      <Comics userRef={userRef} />
    </>
  )
}