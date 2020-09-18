import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { db } from '../Firebase';
import { useParams } from "react-router-dom";
import NagesenButton from "../components/NagesenButton";
import Header from "../components/view_manga"
import Comments from '../components/Comments';
import Grid from '@material-ui/core/Grid';
import { Container, Paper, Typography } from '@material-ui/core';
import { classicNameResolver } from 'typescript';
import UserCard from '../components/UserCard';
import CreatorCard from '../components/CreatorCard';
import Reply from '../components/Reply';

const useStyles = makeStyles(() =>

  createStyles({
    "comicPage": {
      background: "#E9E9E9",
      paddingTop: "50px",
    },
    "commentMainBox": {
      position: "fixed",
      top: "80px",
      width: "30%"
    },
    "commentBox": {
      background: "rgb(250,250,250)",
      padding: "20px 0",
      borderRadius: "20px",
      boxShadow: "0 0 30px grey",
    },
    "creatorPro":{
      display: "flex",
      justifyContent: "center",
      background:"#364e96",
      width:"85%",
      margin:"0 auto",
      boxShadow: "0 0 20px grey",
      borderRadius: "10px",
      fontWeight:"bold",
      padding:"10px 0",
      color:"#FFFFFF"
    },
    "creatorCard":{
      
    },
    "creatorToko":{
      lineHeight: "48px", 
      fontSize: "24px",

    },
    "commentTitle": {

    },
    "nagesenButton": {
      display: "flex",
      justifyContent: "center"
    },
    "comicMainBox": {
      display: "flex",
      justifyContent: "center",
      width: "70%",
      marginLeft: "auto"
    },
    "comicBox": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: "85%",
      background: "rgb(250,250,250)",
      padding: "20px 0",
      borderRadius: "20px",
      boxShadow: "0 0 30px grey",
      textAlign:"center"
    },
    "comicTitle": {
      width:"85%",
      margin:"40px auto",
      background:"#364e96",
      padding:"30px 0",
      color:"#FFFFFF",
      borderRadius: "10px",
      fontWeight:"bold",
      fontSize:"25px",
      boxShadow: "0 0 20px grey",
    },
    "comic": {

    },
  }),

);

export default function ComicPage() {
  const useClasses = useStyles();
  const { comicId } = useParams<{ comicId: string }>();
  const [comicRef, setComicRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();
  const [comments, setComments] = useState<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);
  const [comicCreatorRef, setComicCreatorRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();
  const [title, setTitle] = useState<string>("");
  let white:string="#FFFFFF";


  async function updateComments(comicRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>) {
    const querySnapshot = await db.collection("comments")
      .where("comicRef", "==", comicRef)
      .orderBy("createdAt", "desc")
      .get();
    setComments(querySnapshot.docs);
  }


  useEffect(() => {
    console.log(comicId);

    const comicRef = db.collection("comics").doc(comicId);
    comicRef.get()
      .then(async function (doc) {
        if (doc.exists) {
          setComicCreatorRef(doc.data()!.userRef);
          setTitle(doc.data()!.title);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      })

    setComicRef(comicRef);
    updateComments(comicRef);
  }, []);

  return (
    <div className={useClasses.comicPage}>
      <div className={useClasses.commentMainBox}>
        <div className={useClasses.commentBox}>
          <div className={useClasses.creatorPro}>
            <UserCard userRef={comicCreatorRef} color={white}/>
            <span className={useClasses.creatorToko} >(投稿者)</span>
          </div>
          <Comments comments={comments} comicRef={comicRef} />

          <div className={useClasses.nagesenButton}>
            <NagesenButton comicRef={comicRef} updateComments={updateComments} />
          </div>
        </div>
      </div>

      <div className={useClasses.comicMainBox}>
        <div className={useClasses.comicBox}>
          <div className={useClasses.comicTitle}>{title}</div>
          <Header comicRef={comicRef} />
        </div>    
      </div>
    </div>
  );
}