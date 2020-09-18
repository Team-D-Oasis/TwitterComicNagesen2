import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import { Card } from '@material-ui/core';

interface Props {
  commentRef: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
}

export default function Reply(props: Props) {
  const [iconURL, setIconURL] = useState('');
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
    <Card style={{ width: '100%', paddingLeft: '20px', paddingTop: '10px'}}>
      <Link to={creatorURL}>
        <img src={iconURL} alt="icon" style={{ float: 'left' }}/>
      </Link>
      <p>{reply}</p>
    </Card>
  );
}