import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  userRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

export default function CreatorCard(props: Props) {
  const [iconURL, setIconURL] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorURL, setCreatorURL] = useState('');

  useEffect(() => {
    if (!props.userRef) {
      return;
    }

    props.userRef.get().then((snap: any) => {
     console.log(snap)
     /*
      setIconURL(snap.data().iconURL);
      setCreator(snap.data().name);
      setCreatorURL('/comic_list/'+ snap.id);
      */
    });
  },[props.userRef])

  return (
    <div>
      <Link to={creatorURL}>
        <img src={iconURL} alt="icon"/>
        <p>{creator}</p>
      </Link>
    </div>
  );
}