import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import useUser from '../hooks/useUser';
import {
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddComic from '../components/AddComic';
import ComicList from '../components/ComicList';
import AccountRegistration from '../components/AccountRegistration';
import ListItemLink from '../components/ListItemLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

type NavState = "漫画一覧" | "漫画投稿" | "口座登録";

export default function MyPage() {
  const classes = useStyles();
  const { user } = useUser();
  const [nav, setNav] = useState<NavState>("漫画一覧");
  const [userRef, setUserRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();

  useEffect(() => {
    if (user) {
      const userRef = db.collection("users").doc(user.uid);
      setUserRef(userRef);
    }
  }, [user])

  function MyPageMenu() {
    return (
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem
          button
          selected={nav === "漫画一覧"}
          onClick={() => setNav("漫画一覧")}
        >
          <ListItemText primary="漫画一覧" />
        </ListItem>
        <ListItem
          button
          selected={nav === "漫画投稿"}
          onClick={() => setNav("漫画投稿")}>
          <ListItemText primary="漫画投稿" />
        </ListItem>
        <ListItem
          button
          selected={nav === "口座登録"}
          onClick={() => setNav("口座登録")}
        >
          <ListItemText primary="口座登録" />
        </ListItem>
      </List>
    );
  }

  function MyPageContent() {
    if (nav === "漫画一覧") {
      return (
        <List>
          <ListItemLink primary={"実際の漫画一覧画面"} to={`/comic_list/${userRef?.id}`} />
          <Divider />
          <ComicList userRef={userRef}></ComicList>
        </List>
      );
    } else if (nav === "漫画投稿") {
      return <AddComic></AddComic>
    } else if (nav === "口座登録") {
      return <AccountRegistration userRef={userRef}></AccountRegistration>
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <MyPageMenu></MyPageMenu>
        </Grid>
        { userRef &&
          <Grid item xs={9}>
          {
            MyPageContent()
          }
          </Grid>
        }
      </Grid>
    </div>
  );
}