import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { db } from '../Firebase';
import Comment from './Comment';
import { DataUsageSharp } from '@material-ui/icons';
import { cpuUsage } from 'process';

const useStyles = makeStyles(() =>
    createStyles({
        "commentsBox": {
            border: "solid 3px #364e96",
            margin: "50px auto",
            width: "80%",
            height: "600px",
            padding: "0",
            overflow: "auto"
        },
    }),
);

interface Props {
    comicRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
    comicId:String;
}

export default function Comments(props: Props) {
    const useClasses = useStyles();
    const [buff, setBuff] = useState(Array);
    const [buffUser, setBuffUser] = useState(Array);
    const [buffComic, setBuffComic] = useState(Array);
    let buffArr: any[] = new Array();
    let buffComicComment: any[] = new Array();

    useEffect(() => {
        
        db.collection("comments").get().then(async (querySnapshot) => {
            //buff(comments情報(price,content))
            querySnapshot.forEach((doc) => {
                buffArr.push([doc.data().price, doc.data().content]);
            });
            setBuff(buff.concat(buffArr))

            //buffUser(user情報)
            const buffUserArr = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const userData = (await doc.data().userRef.get()).data();
                    return [userData.iconURL, userData.name];
                })
            );
            //buffComic(commentsのcomicID)
            const buffComicArr = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const comicData = (await doc.data().comicRef.get()).id;
                    return comicData;
                })
            );
            setBuffUser(buffUserArr);
            setBuffComic(buffComicArr);
            
        })
            .catch((error) => {
                console.log(`データの取得に失敗しました (${error})`);
            });
    }, []);

    return (
        <List className={useClasses.commentsBox}>
            {buffComic.map((comicData: any, index) => {
                if(comicData==props.comicId){
                return <Comment userURL={buffUser[index]} userName={buffUser[index]} price={buff[index]} content={buff[index]} key={index.toString()} />
                }
            })}
        </List>
    );


}