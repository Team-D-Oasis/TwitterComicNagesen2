import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';

interface Props {
  comicRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | undefined
}

/* 投げ銭を表示させるコンポーネント */
// 引数 props : commicsのRef
// 使用例　<sum_nagesen comicRef={comicRef}/>
export default function calnagesen(props : Props) {
  // 投げ銭総額
  const [money, setmoney] = useState(0);

  // firebaseからサーチする
  useEffect(
    () => {
      //　空回り
      if (props.comicRef === undefined) {
        return
      }
      // commentsの中からこの漫画へのコメントを探す
      db.collection("comments").where("comicRef", "==", props.comicRef)
      .get()
      .then(function(querySnapshot) {
        var sum = 0;
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // 投げ銭してくれた金額を足す
            sum += doc.data().price;
        });
        setmoney(sum);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    },
    [props.comicRef]
  );
  
  return (
    <div>
      {"投げ銭総額 : " + money + "円"}
    </div>
  );
}