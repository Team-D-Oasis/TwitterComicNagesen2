import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import Viewtitle from '../components/view_mangatitle';
import { List } from '@material-ui/core';
import ListItemLink from '../components/ListItemLink';

export default function ComicPage() {
  const [comics, setComics] = useState<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);

  useEffect(() => {
    const f = async () => {
      try {
        const querySnapshot = await db.collection("comics").orderBy("createdAt", "desc").get();
        setComics(querySnapshot.docs);
      } catch (err) {
        console.log(err);
      }
    }

    f();
  }, [])

  return (
    <div className="ComicPage">
      <p>最新作!</p>
      <List>
        {
          comics.map((comic) => {
            var d = new Date(comic.data().createdAt.toDate());
            var year  = d.getFullYear();
            var month = d.getMonth() + 1;
            var day   = d.getDate();
            var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
            var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
            var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
            return (
              <ListItemLink 
              key={comic.id} 
              primary={comic.data().title + "   投稿日時 : " + year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec} 
              to={`/comic/${comic.id}`} 
              />
            )
          })
        }
      </List>
    </div>
  );
}