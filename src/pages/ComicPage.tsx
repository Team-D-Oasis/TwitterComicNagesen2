import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { useParams } from "react-router-dom";

import NagesenButton from "../components/NagesenButton";

export default function ComicPage() {
  const { comicId } = useParams<{comicId: string}>();
  const [comicRef, setComicRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();

  useEffect(() => {
    console.log(comicId);

    const comicRef = db.collection("comics").doc(comicId);
    setComicRef(comicRef);

    console.log(comicRef);
  }, []);

  return (
    <div className="ComicPage">
      <p>Comic page</p>
      <NagesenButton comicRef={comicRef}/>
    </div>
  );
}