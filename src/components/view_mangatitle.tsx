import React, { useState, useEffect } from 'react';

interface Props {
  comicRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | undefined
}

// 引数 props : commicsのRef
// 使用例 <View_mangaday comicRef={comicRef}/>
export default function Header(props : Props) {
  const [manga_title, setmanga_title] = useState([]);

  // firebaseからサーチする
  useEffect(
    () => {
      if (props.comicRef === undefined) {
        return
      }
      props.comicRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setmanga_title(doc.data()!.title)
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

  return (
    <div>
      {"漫画のタイトル : " + manga_title}
    </div>
  );
}