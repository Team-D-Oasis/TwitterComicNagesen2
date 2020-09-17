import React, { useState, useEffect } from 'react';

interface Props {
  comicRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | undefined
}

// 引数 props : commicsのRef
// 使用例 <View_mangatitle comicRef={comicRef}/>
export default function Header(props : Props) {
  const [manga_day, setmanga_day] = useState(Date);

  // firebaseからサーチする
  useEffect(
    () => {
      if (props.comicRef === undefined) {
        return
      }
      props.comicRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setmanga_day(doc.data()!.createdAt.toDate())
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
  console.log(manga_day);
  var d = new Date(manga_day);
  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var day   = d.getDate();
  var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  return (
    <div>
      {"投稿日時 : " + year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec}
    </div>
  );
}