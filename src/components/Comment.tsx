import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

interface Props {
    commentRef: any;
    content: string;
    price: number;
}

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

const Comment = (props: Props) => {
    const useClasses = useStyles();
    const [userData, setUserData] = useState<any>();
    //投げ銭金額用の変数
    // let money:number=props.money
    //moneyに金額の有無によってコメント別のスタイルを代入

    useEffect(() => {
        const f = async () => {
            const user = await props.commentRef.data().userRef.get();
            const userData = user.data();
            console.log(userData)
            setUserData(userData)
        }

        f();
    }, []);
    
    return (
        <ListItem alignItems="flex-start" className={useClasses.moneyComment}>
            { userData && (
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={userData.iconURL} />
                </ListItemAvatar>
            )}
            <ListItemText
                primary={userData ? userData.name : ""}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className={useClasses.moneyCommentBox}
                        >
                        {props.price}
                        </Typography>
                        {props.content}
                    </React.Fragment>
                }
            />
        </ListItem>    
    )
}

export default Comment