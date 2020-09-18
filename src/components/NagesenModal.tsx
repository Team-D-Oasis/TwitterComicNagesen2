import React, { useState } from 'react';
import {
  Modal,
  TextField,
  FormControl,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { modalStyles } from '../styles/ModalStyle';
import {db} from '../Firebase';
import useUser from '../hooks/useUser';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface Props {
  comicRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  isOpen: boolean;
  onClose(): void;
  updateComments: Function;
}

export default function NagesenModal(props: Props) {
  const classes = modalStyles();
  const [price, setPrice] = useState<number>(100);
  const [comment, setComment] = useState<string>("");
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const {user} = useUser();
  const nagesenPrices: number[] = [100, 500, 1000, 5000, 10000];

  function validPrice(price: number) {
    return !isNaN(price) && price >= 0;
  }

  function onChangePrice(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const price = Number(e.target.value);
    if (validPrice(price)) {
      setPrice(price);
    }
  }

  function onChangeComment(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setComment(e.target.value);
  }

  async function onClickNagesen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (user && props.comicRef) {
      console.log("投げ銭する！", price, comment);
      try {
        const userRef = db.collection("users").doc(user.uid);
        const commentRef = await db.collection("comments").add({
          userRef: userRef,
          comicRef: props.comicRef,
          content: comment,
          price: price,
          createdAt: new Date(),
        })

        console.log("投げ銭完了!", price, (await commentRef.get()).data());

        setIsFinished(true);

        props.updateComments(props.comicRef);
      } catch(err) {
        console.log(err)
      }
    }
  }

  function onClose() {
    props.onClose();
    setIsFinished(false);
  }

  const modalBody = (
    <FormControl className={classes.paper}>
      <TextField
        id="standard-number"
        label="投げ銭額"
        type="number"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={price}
        onChange={onChangePrice}
      />
      <ButtonGroup color="primary" style={{display: "flex", justifyContent: "center"}}>
        { nagesenPrices.map((price) => {
          return (
            <Button
              key={price}
              onClick={() => setPrice(price)}
            >
              {price}円
            </Button>
          )
        })
        }
      </ButtonGroup>
      <TextField
        id="outlined-multiline-static"
        label="コメント"
        multiline
        rows={4}
        variant="outlined"
        value={comment}
        onChange={onChangeComment}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={onClickNagesen}
      >
        投げ銭する！
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={onClose}
      >
        キャンセル
      </Button>
    </FormControl>
  );

  const finishNagesenBody = (
    <FormControl className={classes.paper}>
      <FavoriteIcon
        color="secondary"
        style={{ fontSize: 60 }}
      ></FavoriteIcon>
      <p>あなたの応援がクリエイターの生活を豊かにします！</p>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
      >
        その通り！
      </Button>
    </FormControl>
  );

  return (
    <Modal
      open={props.isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {isFinished ? finishNagesenBody : modalBody }
    </Modal>
  )
}