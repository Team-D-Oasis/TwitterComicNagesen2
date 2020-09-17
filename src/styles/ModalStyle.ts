import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const modalStyles = makeStyles((theme: Theme) => {
  const top = 50;
  const left = 50;

  return createStyles({
    paper: {
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      borderRadius: "16px 16px 16px 16px",
      outline: 0,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
  });
});

