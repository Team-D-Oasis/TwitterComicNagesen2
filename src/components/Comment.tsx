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
            fontWeight: "bold"
        },
        "content": {

        },
        "topBox": {

        },
        "contentBox": {
            padding: "3px",
            background: "rgba(255,255,255,0.3)",
            borderRadius: "3px"
        },
        "noColor": {
            background:"#FFFFFF",
            borderRadius: "5px",
            marginBottom: "2px"
        },
        "colorA": {
            background: "#00FFFF",
            borderRadius: "5px",
            marginBottom: "2px"
        },
        "colorB": {
            background: "#40E0D0",
            borderRadius: "5px",
            marginBottom: "2px"
        },
        "colorC": {
            background: "#ADFF2F",
            borderRadius: "5px",
            marginBottom: "2px"
        },
        "colorD": {
            background: "#FFD700",
            borderRadius: "5px",
            marginBottom: "2px"
        },
        "colorE": {
            background: "#FF8C00",
            borderRadius: "5px",
            marginBottom: "2px"
        }
    }),
);

const Comment = (props: Props) => {
    const useClasses = useStyles();
    const [userData, setUserData] = useState<any>();
    //投げ銭金額用の変数
    let money: number = props.price;

    let moneyStyle: any
    //moneyに金額の有無によってコメント別のスタイルを代入
    if (money < 1) { moneyStyle = useClasses.noColor }
    if (money <= 100 && money>=1) { moneyStyle = useClasses.colorA }
    if (money >= 500) { moneyStyle = useClasses.colorB }
    if (money >= 1000) { moneyStyle = useClasses.colorC }
    if (money >= 5000) { moneyStyle = useClasses.colorD }
    if (money >= 10000) { moneyStyle = useClasses.colorE }



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
        <ListItem alignItems="flex-start" className={moneyStyle}>
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
                            
                                <div className={useClasses.price}>{"¥" + props.price}</div>
                                 
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