import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Viewtitle from '../components/view_mangatitle';
import { List } from '@material-ui/core';
import ListItemLink from '../components/ListItemLink';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(2),
    },
  }),
)

export default function ComicPage() {
  const classes = useStyles();
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
      <h2 className={classes.title}>新着一覧</h2>
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
                icon={<MenuBookIcon />}
              />
            )
          })
        }
      </List>
    </div>
  );
}