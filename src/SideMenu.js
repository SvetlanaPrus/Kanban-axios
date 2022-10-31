import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Get from "./Get";
import CreateForm from "./CreateForm";
import Home from "./Home";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import DrawerRight from "./DrawerRight";
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import CloudDownloadSharpIcon from '@material-ui/icons/CloudDownloadSharp';
import NoteAddSharpIcon from '@material-ui/icons/NoteAddSharp';
import axios from "axios";
import {v4 as uuidv4} from "uuid";


export default function SideMenu() {

    const drawerWidth = 160;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexGrow: 1,
            '& > svg': {
                margin: theme.spacing(2),
            }
        },
        appBar: {
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        text: {
            color: "primary"
        }
    }));

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    //**************** Right Drawer *************
    const [visible, setVisible] = useState(false)

    function showDrawer() {
        setVisible(true);
    }


    function createTask(date, taskName, taskDescription, taskStatus, taskPriority,
                        setTaskName, setTaskDescription, setTaskStatus, setTaskPriority) {
        axios.post('http://nazarov-kanban-server.herokuapp.com/card', {
            _id: uuidv4(),
            createdAt: date,
            name: taskName,
            description: taskDescription,
            status: taskStatus,
            priority: Number(taskPriority),
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log("Error - can't ADD(get) new Card")
            })
        setTaskName('')
        setTaskDescription('')
        setTaskStatus('')
        setTaskPriority('')
    }


    return (
        <div className={classes.root}>
            <CssBaseline/>

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{marginRight: 10, marginLeft: 10, zIndex: 9999}}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid>
                            <Typography variant="h4" noWrap edge="start" color="inherit"> Kanban </Typography>
                        </Grid>

                        <Grid>
                            <Button color="inherit" onClick={showDrawer}> About </Button>
                            <DrawerRight visible={visible} setVisible={setVisible}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Router>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button>
                            <HomeSharpIcon color="primary" className="spaceIcon"/> <> </>
                            {open && <Link to="/home"> Home </Link>}
                        </ListItem>
                        <ListItem button>
                            <CloudDownloadSharpIcon color="primary" className="spaceIcon"/> <> </>
                            {open && <Link to="/get"> Overview </Link>}
                        </ListItem>
                        <ListItem button>
                            <NoteAddSharpIcon color="primary" className="spaceIcon"/> <> </>
                            {open && <Link to="/create"> Create Task </Link>}
                        </ListItem>
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Typography paragraph>
                        <Switch>
                            <Route path="/get">
                                <Get/>
                            </Route>
                            <Route path="/create">
                                <CreateForm createTask={createTask}/>
                            </Route>
                            <Route path="/home">
                                <Home/>
                            </Route>
                        </Switch>
                    </Typography>
                </main>
            </Router>
        </div>
    );
}