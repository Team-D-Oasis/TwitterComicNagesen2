import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';

// モーダルを出す位置
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//　モーダルの設定
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface Props {
  comicRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | undefined
}

// 引数 props : commicsのRef
// 使用例　<View_manga comicRef={comicRef}/>
export default function Header(props : Props) {
  const [manga_urls, setmanga_urls] = useState([]);

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [mangaurl, setmangaurl] = useState('');

  const handleOpen = (url: string) => {
    setOpen(true);
    setmangaurl(url);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // firebaseからサーチする
  useEffect(
    () => {
      if (props.comicRef === undefined) {
        return
      }
      props.comicRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
              setmanga_urls(doc.data()!.images)
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      },
    [props.comicRef]
  );

  const body = manga_urls.map((url) => (
    <div key={url}>
      <img src={url}  onClick={() => handleOpen(url)}/>
      <Modal
      open={open}
      onClose={handleClose}
      aria-describedby={url}
      >
        {
          <div style={modalStyle} className={classes.paper}>
            <p id={url}>
              <img src={mangaurl} key={mangaurl} width="400"/>
            </p>
          </div>
        }
      </Modal>
    </div>
  ))
  return (
    <div>
      {body}
    </div>
  )
}