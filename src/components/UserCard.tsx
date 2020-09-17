import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  userRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

export default function UserCard(props: Props) {
  const [iconURL, setIconURL] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorURL, setCreatorURL] = useState('');

  useEffect(() => {
    if (!props.userRef) {
      return;
    }

    props.userRef.get().then((snap: any) => {
      setIconURL(snap.data().iconURL);
      setCreator(snap.data().name);
      setCreatorURL('/comic_list/'+ snap.id);
    });
  },[props.userRef])

  return (
    <div>
      <Link to={creatorURL} style={{textDecoration: "none", color: "#000", display: "flex" }}>
      <img width="48" height="48" src={iconURL} style={{borderRadius: "16px 16px 16px 16px"}} alt="icon"/>
      <span style={{fontSize: "24px", lineHeight: "48px"}}>{creator}</span>
    </Link>
    </div>
  );
}