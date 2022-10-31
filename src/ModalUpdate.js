import React from 'react';
import { Modal} from 'antd';
import CreateForm from "./CreateForm";

//*************** Modal Update Form **************
export default function ModalUpdate(props){

    const {visible, setVisible} = props;

    return (
        <>
            <Modal
                title="Update..."
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                zIndex="9999999999"
            >
{/*Vizivaem drugoj komponent "Create Form"*/}
             <CreateForm />

            </Modal>
        </>
    );
};

