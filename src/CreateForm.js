import React, { useState } from 'react';
import './App.css';
import {Form, Input, Radio} from 'antd';
import 'antd/dist/antd.css';
import 'fontsource-roboto';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import {Redirect} from "react-router";


export default function CreateForm(props){

    const {createTask} = props;

    const {goBack, goForward} = useHistory();
    const statuses = ["todo", "progress", "review", "done"]

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const useStyles = makeStyles((theme) => ({
        button: {
            display: 'inline',
            marginRight: theme.spacing(1),
        },
        container: {
            display: 'inline',
            flexWrap: 'wrap',
            marginLeft: 5
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

    }));
    const classes = useStyles();

// ***************************************************************************
    const [date, setDate] = useState(new Date())
    const handleCreateDate = (event) => {
        setDate(event.target.value);
    }

    // ***********************************************************************
    const [taskName, setTaskName] = useState('')
    const handleCreateName = (event) => {
        setTaskName(event.target.value);
    }

    // ****************************************************************
    const [taskDescription, setTaskDescription] = useState('')
    const handleCreateDescription = (event) => {
        setTaskDescription(event.target.value);
    }

    // ********************************************************************
    const [taskStatus, setTaskStatus] = useState('')
    const handleCreateStatus = (event) => {
        setTaskStatus(event.target.value);
    }

    // ********************************************************************
    const [taskPriority, setTaskPriority] = useState('')
    const handleCreatePriority = (event) => {
        setTaskPriority(event.target.value);
    }

// **************************************************************************
    const [saveToggle, setSaveToggle] = useState(false)

    const saveButtonHandler = () => {
        createTask(date, taskName, taskDescription, taskStatus, taskPriority,
            setTaskName, setTaskDescription, setTaskStatus, setTaskPriority);
        setSaveToggle(true);
    }

    // ***********************************************************************

    return (
            <Form
                labelCol={{span: 4,}}
                wrapperCol={{span: 14,}}
                layout="horizontal"
                initialValues={{size: componentSize,}}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
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
                <br/>
                <br/>

                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Id.number:">
                    <Input
                        name="idNumber"
                        style={{ width: 160, marginRight: 15}}
                        disabled={true}
                        display="inline"
                    />

                    Created at:
                    <form className={classes.container} noValidate>
                        <TextField
                            id="datetime-local"
                            label=""
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{shrink: true,}}
                            defaultValue={date}
                            onChange={handleCreateDate}
                        />
                    </form>
                </Form.Item>

                <Form.Item label="Name" rules={[{required: true},]} name="Task name">
                    <Input
                        value={taskName}
                        onChange={handleCreateName}
                    />
                </Form.Item>

                <Form.Item label="Description" rules={[{required: true},]} name="Description">
                    <Input.TextArea
                         value={taskDescription}
                         onChange={handleCreateDescription}
                    />
                </Form.Item>

                {/*nepravilno bil skachen "Select". Nado bilo skachat iz material, a ne iz antd.*/}

                <Form.Item label="Status:" rules={[{required: true},]} name="Status">
                    <FormControl className={classes.formControl}>
                        <Select
                            value={taskStatus}
                            onChange={handleCreateStatus}
                        >
                            {statuses.map((el,i) =>
                                <MenuItem key={i} value={el}> {el} </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Form.Item>

                <Form.Item label="Priority:" rules={[{required: true},]} name="radio-group">
                    <Radio.Group
                        value={taskPriority}
                        onChange={handleCreatePriority}
                    >
                        <Radio value="1">Very High - 1</Radio>
                        <Radio value="2">High - 2</Radio>
                        <Radio value="3">Medium - 3</Radio>
                        <Radio value="4">Low - 4</Radio>
                        <Radio value="5">Minor - 5</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="confirm" label="Confirm:">
                    <Button
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        onClick={saveButtonHandler}
                    >
                        Save
                    </Button>
                    {saveToggle && <Redirect to="/get"/>}

                    <Button
                        variant="contained"
                        size="medium"
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
    );
};

