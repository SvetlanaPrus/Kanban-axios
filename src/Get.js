import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import axios from "axios";
import OneColumn from "./OneColumn";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useHistory} from "react-router-dom";


export default function Get() {

    const {goBack, goForward} = useHistory()
    const [cards, setCards] = useState([]);
    const [columns, setColumns] = useState([]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            backgroundColor: "lightgrey"
        },
        button: {
            display: 'inline',
            marginRight: theme.spacing(1),
            alignContent: "center"
        }
    }));
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    //************************************************************************** GET info from DB:

    function getCards() {
        axios.get('http://nazarov-kanban-server.herokuapp.com/card')
            .then((response) => {
                let newCards = response.data;
                setCards(newCards);
            })
            .catch((error) => {
                console.log("Error - can't GET Cards")
            })
    }

    function getColumnName() {
        axios.get('http://nazarov-kanban-server.herokuapp.com/column')
            .then((response) => {
                let columnName = response.data;
                setColumns(columnName);
            })
            .catch((error) => {
                console.log("Error - can't GET Columns")
            })
    }

    useEffect(() => {
        getColumnName()
        getCards()
    }, [])

// ******************************************************************************** CLEAN TABLE
    function cleanTable(){
        setCards([]);
    }

// ******************************************************************************** DELETE (via axios)
    const handleOk = (id,setIsModalVisible) => {
        axios.delete(`http://nazarov-kanban-server.herokuapp.com/card/${id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error - can't DELETE(get) Cards")
            })
        setIsModalVisible(false);
    };


    return (
        <div className={classes.root}>
            <Button
                onClick={goBack}
                color="primary"
                className={classes.button}
            >
                <ArrowBackIcon color="primary" className="spaceIcon"/><> Back </>
            </Button>
            <Button
                onClick={goForward}
                color="primary"
                className={classes.button}
            >
                <> Forward </><ArrowForwardIcon color="primary" className="spaceIcon"/>
            </Button>

            <Button
                onClick={cleanTable}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Clean Table
            </Button>
            <Button
                onClick={getCards}
                variant="contained"
                color="primary"
            >
                Reset / Refresh
            </Button>
            <h6><br/> *Getting data from DB: "http://nazarov-kanban-server.herokuapp.com/card"</h6><br/>

            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)}/>
                    }
                    label="Enable dense"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)}
                        />
                    }
                    label="Enable secondary text"
                />
            </FormGroup>
            <br/>

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid container item xs={12} spacing={1}>
                        {columns.map(el =>
                            <Grid item xs={3} key={el._id}>
                                <Paper className={classes.paper}>
                                    <OneColumn
                                        column={el}
                                        cards={cards}
                                        handleOk={handleOk}
                                        dense={dense}
                                        secondary={secondary}
                                    />
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </div>

        </div>
    );
}
