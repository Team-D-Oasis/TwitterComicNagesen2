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
            height: "100px",
            borderRadius:"5px",
            marginBottom:"2px"
        },
        "moneyCommentBox": {
            background: "#ff9800",
            width: "80%"
        },
        "commentBox": {

        },
        "name": {

        },
        "price": {
            fontWeight:"bold"
        },
        "content": {

        },
        "topBox":{
            
        },
        "contentBox":{
            padding:"3px",
           background:"rgba(255,255,255,0.3)",
           borderRadius:"3px"
        }
    }),
);

const Comment = (props: Props) => {
    const useClasses = useStyles();
    const [userData, setUserData] = useState<any>();
    //投げ銭金額用の変数
    let money: number = props.price
    //moneyに金額の有無によってコメント別のスタイルを代入
    if (money >= 1000) {
        console.log("赤")
    }

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

                secondary={
                    <React.Fragment>
                        <div className={useClasses.commentBox}>
                            <div className={useClasses.topBox}>
                                <div className={useClasses.name}>{userData ? userData.name : ""}</div>
                                <div className={useClasses.price}>{"¥"+props.price}</div>
                            </div>
                            <div className={useClasses.contentBox}>
                                <div className={useClasses.content}>{props.content}</div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

export default Comment