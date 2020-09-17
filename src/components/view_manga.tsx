import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';

/* 漫画を表示させるコンポーネント（画像をクリックすると、モーダルが出て拡大する）*/

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
export default function View(props : Props) {
  // firebaseから引っ張ってきたimagesの配列
  const [manga_urls, setmanga_urls] = useState([]);

  // モーダルに表示させるurl
  const [modal_url, setmangaurl] = useState('');

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  // モーダルをオープンさせ、表示するurlを更新
  const handleOpen = (url: string) => {
    setOpen(true);
    setmangaurl(url);
  };

  // モーダルをクローズ
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(
    () => {
      // 空回り
      if (props.comicRef === undefined) {
        return
      }

      // firebaseからサーチする
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

  // 実行する部分
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
            <p id={modal_url}>
              <img src={modal_url} key={modal_url} width="400"/>
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