import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import { Card } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  const borderSize = 0;
  return createStyles({
    root: {
      width: `calc(100% - ${borderSize * 2}px)`,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#364e96",
      color: "#fff",
    },
    icon: {
      float: 'left',
      borderRadius: "50%",
    },
    content: {
      width: "calc(100% - 90px)",
      marginLeft: "8px",
      wordBreak: "break-all",
      fontWeight: "bold",
    }
  });
});

interface Props {
  commentRef: any
}

export default function Reply(props: Props) {
  const classes = useStyles();
  const [iconURL, setIconURL] = useState('');
  const [creatorURL, setCreatorURL] = useState('');
  const [reply, setReply] = useState('');

  useEffect(() => {
    if (!props.commentRef) {
      return;
    }

    const f = async () => {
      try {
        const querySnapshot = await db.collection("replies").where("commentRef", "==", props.commentRef).get();
        querySnapshot.forEach(async (doc) => {
          // 参照先のユーザ情報の取得
          const parentSnap = await doc.data().userRef.get();
          setIconURL(parentSnap.data().iconURL);
          setCreatorURL('/comic_list/'+ parentSnap.id);
          // リプライ内容の取得
          setReply(doc.data().content);
        });
      } catch (err) {
        console.log(err);
      }
    }

    f();
  }, [props.commentRef])

  return iconURL != '' ? (
    <Card className={classes.root}>
      <SubdirectoryArrowRightIcon style={{ float: 'left' }}/>
      <Link to={creatorURL}>
        <img src={iconURL} alt="icon" className={classes.icon} />
      </Link>
      <p className={classes.content}>{reply}</p>
    </Card>
  ) : (<div></div>);
}