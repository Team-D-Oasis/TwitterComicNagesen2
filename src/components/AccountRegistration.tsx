import React, { useState } from 'react';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Button,
} from '@material-ui/core';
import { modalStyles } from '../styles/ModalStyle';

interface Props {
  userRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
}

export default function CreditCardModal(props: Props) {
  const classes = modalStyles();
  const [bank, setBank] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [deposit, setDeposit] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

  function onChangeBank(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setBank(e.target.value);
  }

  function onChangeBranch(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setBranch(e.target.value);
  }

  function onChangeDeposit(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setDeposit(e.target.value);
  }

  function onChangeAccount(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setAccount(e.target.value);
  }

  function onChangeLastName(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setLastName(e.target.value);
  }

  function onChangeFirstName(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  async function onClickRegister(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!props.userRef) {
      return;
    }

    try {
      await props.userRef.set({
        creditCard: {
          bank,
          branch,
          deposit,
          account,
          lastName,
          firstName
        }
      }, {merge: true})
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <FormControl className={classes.paper}>
      <TextField
        label="銀行名"
        value={bank}
        onChange={onChangeBank}
        required
      />
      <TextField
        label="支店名"
        value={branch}
        onChange={onChangeBranch}
        required
      />
      <RadioGroup value={deposit} onChange={onChangeDeposit}>
        <div>預金種別</div>
        <FormControlLabel value="普通" control={<Radio />} label="普通" />
        <FormControlLabel value="当座" control={<Radio />} label="当座" />
      </RadioGroup>
      <TextField
        label="口座番号"
        value={account}
        onChange={onChangeAccount}
        required
      />
      <TextField
        label="口座名義(姓)"
        value={lastName}
        onChange={onChangeLastName}
        required
      />
      <TextField
        label="口座名義(名)"
        value={firstName}
        onChange={onChangeFirstName}
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onClickRegister}
      >
        口座登録
      </Button>
    </FormControl>
  )
}