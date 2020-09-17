import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


interface Props {
  comicRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
}

export default function CreatorCard(props: Props) {
  const [iconURL, setIconURL] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorURL, setCreatorURL] = useState('');

  useEffect(() => {
    if (!props.comicRef) {
      return;
    }

    props.comicRef.get().then((snap: any) => {
      setIconURL(snap.data().iconURL);
      setCreator(snap.data().name);
      setCreatorURL('/comic_list/'+ snap.id);
    });
  },[props.comicRef])

  return (
    <div>
      <Link to={creatorURL}>
        <img src={iconURL} alt="icon"/>
        <p>{creator}</p>
      </Link>
    </div>
  );
}