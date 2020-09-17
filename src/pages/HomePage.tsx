import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import Viewtitle from '../components/view_mangatitle';

export default function ComicPage() {
  const [comicRef, setComicRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();

  useEffect(
    () => {
      // firebaseからサーチする
      db.collection("comics").get()
      .then(function(querySnapshot) {
        var maxtime = 0;
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (maxtime < doc.data().createdAt) {
              maxtime = doc.data().createdAt;
              setComicRef(db.collection("comics").doc(doc.id));
            }
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
      }, []
  );

  return (
    <div className="ComicPage">
      <p>最新作!</p>
      <Viewtitle comicRef={comicRef} />
    </div>
  );
}