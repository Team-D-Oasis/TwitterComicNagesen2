import React, { useState } from 'react';
import { db } from '../Firebase';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import useUser from '../hooks/useUser';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
  const userRef = db.collection("users").doc(String(user?.uid));
  const [title, setTitle] = useState<string>("");
  const [comicURLs, setComicURLs] = useState<string[]>([""]);
  const classes = useStyles();

  function resetForm(){
    setTitle("");
    setComicURLs([""]);
  }

  function createComicRecord(){
    if( userRef === null){
      console.log("failed to registrate beacause you are not signin.");
      resetForm();
      return
    }
    if(title === ""){
      console.log("Title cannot be empty.");
      alert("Title cannot be empty.");
      return
    }
    if(comicURLs.includes("")){
      console.log("Comic URL cannnot be empty.");
      alert("Comic URL cannnot be empty.");
      return
    }
    db.collection("comics").add({
      title: title,
      images: comicURLs,
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
        <div>
          <TextField
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) =>{
                const newcomicURLS = [...URLs];
                newcomicURLS[index] = event.target.value;
                setComicURLs(newcomicURLS);
                console.log(URLs);
            }}
            required id="standard-required"
            label="ツイッター漫画URL"
            defaultValue=""
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
    let newURLs = [...comicURLs];
    if(newURLs.length == 1){
      return;
    }
    newURLs.pop();
    setComicURLs(newURLs);
    console.log("delete comic url form");
    console.log(comicURLs);
  }

  function addComicURLForm(){
    let newURLs = [...comicURLs];
    newURLs.push("");
    setComicURLs(newURLs);
    console.log("add comic url form");
    console.log(comicURLs);
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
          id="standard-required"
          label="タイトル"
          defaultValue=""
          value={title}
          variant="filled"
          className={classes.textfield}
        />
      </div>
      <div>
        {displayInputForm(comicURLs)}
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
