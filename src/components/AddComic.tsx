import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import useUser from '../hooks/useUser';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
  import fetchImgArrayFromTwitterArray from './FetchFromTwitterLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      margin: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export default function AddComicComponent() {
  const {user, login, logout} = useUser();
  const [userRef, setUserRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();
  const [title, setTitle] = useState<string>("");
  const [twitterURLs, settwitterURLs] = useState<string[]>([""]);
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      const userRef = db.collection('users').doc(user.uid);
      setUserRef(userRef);
    }
  }, [user])

  function resetForm(){
    setTitle("");
    settwitterURLs([""]);
  }

  async function createComicRecord(){
    if(userRef === null || userRef === undefined){
      console.log("failed to registrate beacause you are not signin.");
      resetForm();
      return
    }
    if(title === ""){
      console.log("Title cannot be empty.");
      alert("Title cannot be empty.");
      return
    }
    if(twitterURLs.includes("")){
      console.log("Comic URL cannnot be empty.");
      alert("Comic URL cannnot be empty.");
      return
    }

    const imgArray = await fetchImgArrayFromTwitterArray(twitterURLs);
    console.log("imgArray", imgArray);
    db.collection("comics").add({
      title: title,
      images: imgArray,
      createdAt: new Date,
      userRef: userRef
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    resetForm()
  }

  function displayInputForm(URLs: string[]){
    const urlFormArray = URLs.map(function(comicURL, index){
      return(
        <div key={index}>
          <TextField
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) =>{
                const newtwitterURLs = [...URLs];
                newtwitterURLs[index] = event.target.value;
                settwitterURLs(newtwitterURLs);
                console.log(URLs);
            }}
            required
            label="ツイッター漫画URL"
            value={comicURL}
            variant="filled"
            className={classes.textfield}
          />
        </div>
      )
    });
    return urlFormArray;
  }

  function deleteComicURLForm(){
    let newURLs = [...twitterURLs];
    if(newURLs.length == 1){
      return;
    }
    newURLs.pop();
    settwitterURLs(newURLs);
    console.log("delete comic url form");
    console.log(twitterURLs);
  }

  function addComicURLForm(){
    let newURLs = [...twitterURLs];
    newURLs.push("");
    settwitterURLs(newURLs);
    console.log("add comic url form");
    console.log(twitterURLs);
  }

  return(
    <div>
      <div>
        <TextField
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>) =>{
              setTitle(event.target.value);
              console.log(title);
          }}
          required
          label="タイトル"
          value={title}
          variant="filled"
          className={classes.textfield}
        />
      </div>
      <div>
        {displayInputForm(twitterURLs)}
      </div>
      <Button
        onClick={addComicURLForm}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        +
      </Button>
      <Button
        onClick={deleteComicURLForm}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        -
      </Button>
      <Button
        onClick={createComicRecord}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        登録
      </Button>
    </div>
  )
}
