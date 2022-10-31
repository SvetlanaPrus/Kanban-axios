import React from 'react';
import { Modal} from 'antd';


export default function ModalDelete(props) {

    const {handleOk, cardId, isModalVisible, setIsModalVisible,} = props;


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal
                title="Delete..."
                width={400}
                visible={isModalVisible}
                onOk={() => handleOk(cardId,setIsModalVisible)}
                onCancel={handleCancel}
            >
                <p> This Task will be deleted permanently.<br/> Do you want to delete it anyway? </p>
            </Modal>
        </>
    );
}

