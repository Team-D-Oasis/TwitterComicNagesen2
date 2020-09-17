import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { db } from '../Firebase';
import Comment from './Comment';

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
}

export default function Comments(props: Props) {
    const useClasses = useStyles();
    const [comments, setComments] = useState<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]>([]);

    useEffect(() => {
        console.log("Comments")
        if (!props.comicRef) {
            return;
        }

        console.log(props.comicRef);

        const f = async () => {
            const querySnapshot = await db.collection("comments").where("comicRef", "==", props.comicRef).get();
            setComments(querySnapshot.docs);

            console.log("test", querySnapshot.docs[0].data().commentRef)
        }

        f();
    }, [props.comicRef]);

    return (
        <List className={useClasses.commentsBox}>
            {comments.map((comment) => {
                return (
                    <Comment
                        key={comment.id}
                        commentRef={comment}
                        content={comment.data().content}
                        price={comment.data().price}
                    />
                )
            })}
        </List>
    );
}