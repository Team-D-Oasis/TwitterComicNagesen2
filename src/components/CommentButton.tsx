import React from 'react';
import Button from '@material-ui/core/Button';

export default function CommentButton() {
  
  function onButtonClick() {
    console.log("コメントする");
  }

  return (
    <Button
      variant="contained"
      onClick={onButtonClick}
    >コメントする</Button>
  );
}