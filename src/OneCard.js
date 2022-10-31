import React, {useState} from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import makeStyles from "@material-ui/core/styles/makeStyles";


export default function OneCard(props) {

    const {handleOk, card, secondary} = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();

    //********************************************************************** Modal UPDATE
    const [visible, setVisible] = useState(false);

// ******************************************************************************* DELETE
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };


    return (
        <div className={classes.root}>
                                                                          {/*Card name and description*/}
            <ListItemText
                primary={card.name}
                secondary={secondary ? card.description : null}
                alignItems={"flex-start"}
            />

            <ListItemSecondaryAction className="editButton">                   {/*Edit*/}
                <IconButton
                    variant="outlined"
                    color="primary"
                    aria-label="edit"
                    onClick={() => setVisible(true)}>
                    <EditOutlinedIcon/>
                </IconButton>
            </ListItemSecondaryAction>
            <ModalUpdate visible={visible} setVisible={setVisible}/>

            <ListItemSecondaryAction>                                          {/*Delete*/}
                <IconButton
                    variant="outlined"
                    color="secondary"
                    edge="end"
                    aria-label="delete"
                    onClick={showModal}
                >
                    <DeleteSweepOutlinedIcon/>
                </IconButton>
            </ListItemSecondaryAction>

            <ModalDelete
                handleOk={handleOk}
                cardId={card._id}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </div>
    )
}

