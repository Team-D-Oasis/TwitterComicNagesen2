import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import { List } from '@material-ui/core';
import ListItemLink from './ListItemLink';
import MenuBookIcon from '@material-ui/icons/MenuBook';

interface Props {
  userRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

export default function ComicList(props: Props) {
  const [comics, setComics] = useState<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);

  useEffect(() => {
    if (!props.userRef) {
      return;
    }

    const f = async () => {
      try {
        const querySnapshot = await db.collection("comics").where("userRef", "==", props.userRef).get();
        setComics(querySnapshot.docs);
      } catch (err) {
        console.log(err);
      }
    }

    f();
  }, [props.userRef])

  return (
    <div>
      <List>
        {comics.map((comic) => {
          return (
            <ListItemLink key={comic.id} primary={comic.data().title} to={`/comic/${comic.id}`} icon={<MenuBookIcon />} />
          )
        })}
      </List>
    </div>
  );
}