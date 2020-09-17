import React, { useState } from 'react';
import {
  Modal,
  TextField,
  FormControl,
  Button,
} from '@material-ui/core';
import { modalStyles } from '../styles/ModalStyle';

interface Props {
  userRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  isOpen: boolean;
  onClose(): void;
}

export default function CreditCardModal(props: Props) {
  const classes = modalStyles();
  const [number, setNumber] = useState<string>("");
  const [cvc, setCVC] = useState<string>("");
  const [expireYear, setExpireYear] = useState<number>(20);
  const [expireMonth, setExpireMonth] = useState<number>(1);

  function onChangeNumber(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setNumber(e.target.value);
  }

  function onChangeCVC(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setCVC(e.target.value);
  }

  function validExpireYear(year: number) {
    return !isNaN(year) && year >= 20;
  }

  function onChangeExpireYear(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const year = Number(e.target.value);
    if (validExpireYear(year)) {
      setExpireYear(year);
    }
  }

  function validExpireMonth(month: number) {
    return !isNaN(month) && month >= 1 && month <= 12;
  }

  function onChangeExpireMonth(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const month = Number(e.target.value);
    if (validExpireMonth(month)) {
      setExpireMonth(month);
    }
  }

  async function onClickRegister(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!props.userRef) {
      return;
    }

    try {
      await props.userRef.set({
        creditCard: {
          number,
          cvc,
          expireYear,
          expireMonth,
        }
      }, {merge: true})

      props.onClose();
    } catch(err) {
      console.log(err);
    }
  }

  const modalBody = (
    <FormControl className={classes.paper}>
      <TextField
        label="カード番号"
        value={number}
        onChange={onChangeNumber}
        required
      />
      <TextField
        label="CVC"
        value={cvc}
        onChange={onChangeCVC}
        required
      />
      <div>
        <TextField
          label="年"
          value={expireYear}
          onChange={onChangeExpireYear}
          required
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="月"
          value={expireMonth}
          onChange={onChangeExpireMonth}
          required
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onClickRegister}
      >
        カード登録
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={props.onClose}
      >
        キャンセル
      </Button>
    </FormControl>
  );

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {modalBody}
    </Modal>
  )
}