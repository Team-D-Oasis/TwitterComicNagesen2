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

const useStyles = makeStyles(() =>

  createStyles({
    "comicPage": {
      background:"#E9E9E9",
      paddingTop:"50px",
    },
    "commentMainBox":{
      position:"fixed",
      top:"80px",
      width:"30%"
    },
    "commentBox":{
      background:"rgb(250,250,250)",
      padding:"20px 0",
      borderRadius:"20px",
      boxShadow:"0 0 30px grey", 
    },
    "nagesenButton": {
      display: "flex",
      justifyContent: "center"
    },
    "comicMainBox": {
      display: "flex",
      justifyContent: "center",   
      width:"70%",
      marginLeft:"auto"
    },
    "comicBox": {
      display: "flex",
      justifyContent: "center",
      width: "85%",
      background:"rgb(250,250,250)",
      padding:"20px 0",
      borderRadius:"20px",
      boxShadow:"0 0 30px grey"
    },
    "comic":{

    },
  }),

);

export default function ComicPage() {
  const useClasses = useStyles();
  const { comicId } = useParams<{ comicId: string }>();
  const [comicRef, setComicRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();

  useEffect(() => {
    console.log(comicId);

    const comicRef = db.collection("comics").doc(comicId);
    setComicRef(comicRef);
    console.log(comicRef);
  }, []);

  return (
    <div className={useClasses.comicPage}>

      
        <div className={useClasses.commentMainBox}>
          <div className={useClasses.commentBox}>
            
            <Comments comicRef={comicRef} />
            <div className={useClasses.nagesenButton}>
              <NagesenButton comicRef={comicRef}/>
            </div>
          </div>
        </div>
      
        <div className={useClasses.comicMainBox}>
          <div className={useClasses.comicBox}>
            <Header comicRef={comicRef}/>
          </div>
        </div>
   

    </div>
  );
}