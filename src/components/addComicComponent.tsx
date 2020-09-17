import React, { useState } from 'react';
import { db } from '../Firebase';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import useUser from '../hooks/useUser';

export default function AddComicComponent() {
  const {user, login, logout} = useUser();
  const userRef = db.collection("users").doc(String(user?.uid));
  const [title, setTitle] = useState<string>("");
  const [comicURL, setComicURL] = useState<string>("");

  function resetForm(){
    setTitle("");
    setComicURL("")
  }

  function registrateComic(){
    if( userRef === null){
      console.log("failed to registrate beacause you are not signin.");
      resetForm();
      return
    }
    if(title === ""){
      console.log("Title cannot be empty.");
      return
    }
    if(comicURL === ""){
      console.log("Comic URL cannnot be empty.");
      return
    }
    db.collection("comics").add({
      title: title,
      images: [comicURL],
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

  return(
    <div>
      <TextField
      onChange={
        (event: React.ChangeEvent<HTMLInputElement>) =>{
          setTitle(event.target.value);
          console.log(title);
      }}
      required id="standard-required"
      label="タイトル"
      defaultValue=""
      value={title}
      />
      <TextField
      onChange={
        (event: React.ChangeEvent<HTMLInputElement>) =>{
          setComicURL(event.target.value);
          console.log(comicURL);
      }}
      required id="standard-required"
      label="ツイッター漫画URL"
      defaultValue=""
      value={comicURL}
      />
      <Button onClick={registrateComic}>登録</Button>
    </div>
  )
}
