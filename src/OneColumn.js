import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import OneCard from "./OneCard";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

export default function OneColumn(props) {

    const {handleOk, column, cards, dense, secondary} = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        card: {
            backgroundColor: "whitesmoke",
            borderRadius: 4,
            marginBottom: 6,
            color: "black",
        }
    }))
    const classes = useStyles();

    // let newColumnName = column;
    //     (column.title.substring(0, 1).toUpperCase() + column.title.substring(1,)).replace(' ', '')

    let columnStatus = column.status.replace(" ", "");

    return (
        <div className={classes.root}>
            <Typography key={column._id} variant="h6">
                {/*Delaem pervuju bukvu bolshoj i soedinjaem 2 slova*/}
                { (column.title.substring(0, 1).toUpperCase() + column.title.substring(1,)).replace(' ', '')}
            </Typography>

            {/*Vazno! esli mi ukazivaem md={12}, to kartochka zaimet vse prostranstvo stroki, vse pole po dline*/}
            {/*Pomnit, chto odin stolbec eto 100% ili 12*/}

            <Grid item xs={12} md={12}>
                <List dense={dense}>
                    {cards.filter(el => el.status === columnStatus)
                        .sort((a, b) => a.priority - b.priority)
                        .map(item =>
                            <ListItem key={item._id} className={classes.card}>
                                <OneCard handleOk={handleOk} card={item} secondary={secondary}/>
                            </ListItem>
                        )}
                </List>
            </Grid>
        </div>
    )
}

