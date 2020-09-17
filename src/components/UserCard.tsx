import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ListItemLink from '../components/ListItemLink';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

interface Props {
  userRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

interface Props {
  comicRef?: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
}

export default function UserCard(props: Props) {
  const [iconURL, setIconURL] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorURL, setCreatorURL] = useState('');

  useEffect(() => {
    if (!props.userRef) {
      return;
    }

    props.userRef.get().then((snap: any) => {
      setIconURL(snap.data().iconURL);
      setCreator(snap.data().name);
      setCreatorURL('/comic_list/'+ snap.id);
    });
  },[props.userRef])

  return (
    <Link to={creatorURL} style={{textDecoration: "none", color: "#000", display: "flex" }}>
      <img width="48" height="48" src={iconURL} style={{borderRadius: "16px 16px 16px 16px"}} alt="icon"/>
      <span style={{fontSize: "24px", lineHeight: "48px"}}>{creator}</span>
    </Link>
  );
}