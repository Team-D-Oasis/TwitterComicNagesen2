import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';

interface Props {
  commentRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

export default function Reply(props: Props) {
  const [iconURL, setIconURL] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorURL, setCreatorURL] = useState('');
  const [reply, setReply] = useState('');

  useEffect(() => {
    if (!props.commentRef) {
      return;
    }

    const f = async () => {
      try {
        const querySnapshot = await db.collection("replies").where("commentRef", "==", props.commentRef).get();
        querySnapshot.forEach(async (doc) => {
          // 参照先のユーザ情報の取得
          const parentSnap = await doc.data().userRef.get();
          setIconURL(parentSnap.data().iconURL);
          setCreator(parentSnap.data().name);
          setCreatorURL('/comic_list/'+ parentSnap.id);
          // リプライ内容の取得
          setReply(doc.data().content);
        });
      } catch (err) {
        console.log(err);
      }
    }

    f();
  }, [props.commentRef])

  return (
    <div>
      <Link to={creatorURL}>
        <img src={iconURL} alt="icon"/>
        <p>{creator}</p>
      </Link>
      <p>{reply}</p>
    </div>
  );
}