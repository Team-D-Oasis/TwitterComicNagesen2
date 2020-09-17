import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>

    createStyles({

        "moneyComment": {
            background: "#f44336",
            height: "100px"
        },
        "moneyCommentBox": {
            background: "#ff9800",
            width: "80%"
        },
        "comment": {

        }
    }),

);
const Comment = (props:any) => {
    const useClasses = useStyles();
    //投げ銭金額用の変数
    let money:number=props.money
    //moneyに金額の有無によってコメント別のスタイルを代入
    
    return (
        <ListItem alignItems="flex-start" className={useClasses.moneyComment}>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={String(props.userURL[0])} />
            </ListItemAvatar>
            <ListItemText
                primary={props.userName[1]}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={useClasses.moneyCommentBox}
                        >
                        {props.price[0]}
                        </Typography>
                        {props.content[1]}
                    </React.Fragment>
                }
            />
        </ListItem>    
    )
}

export default Comment