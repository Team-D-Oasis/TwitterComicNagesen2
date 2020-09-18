import React, {useState, useEffect} from 'react';
import useUser from '../hooks/useUser';
import {Button} from '@material-ui/core';
import NagesenModal from './NagesenModal';
import CreditCardModal from './CreditCardModal';
import { db } from '../Firebase';

interface Props {
  comicRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
  updateComments: Function;
}

export default function NagesenButton(props: Props) {
  const {user, login} = useUser();
  const [userRef, setUserRef] = useState<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>();
  const [nagesenModalIsOpen, setNagesenModalIsOpen] = useState<boolean>(false);
  const [creditCardModalIsOpen, setCreditCardModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const userRef = db.collection('users').doc(user.uid);
      setUserRef(userRef);
    }
  }, [user])

  async function onButtonClick() {
    if (userRef) {
      const userDoc = (await userRef.get());
      if (userDoc.data()!.creditCard) {
        setNagesenModalIsOpen(true);
      } else {
        setCreditCardModalIsOpen(true);
      }
    } else {
      login();
    }
  }

  function onNagesenModalClose() {
    setNagesenModalIsOpen(false);
  }

  function onCreditCardModalClose() {
    setCreditCardModalIsOpen(false);
  }

  return (
    <div>
      <NagesenModal
        comicRef={props.comicRef}
        updateComments={props.updateComments}
        isOpen={nagesenModalIsOpen}
        onClose={onNagesenModalClose}
      />
      <CreditCardModal
        userRef={userRef}
        isOpen={creditCardModalIsOpen}
        onClose={onCreditCardModalClose}
      />
      <Button
        variant="contained"
        color="secondary"
        style={{fontSize: "60px"}}
        onClick={onButtonClick}
      >応援する</Button>
    </div>
  );
}