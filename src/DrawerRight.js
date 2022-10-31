import {Drawer} from 'antd';
import React from 'react';
// import HelpOutlineSharpIcon from '@material-ui/icons/HelpOutlineSharp';

export default function DrawerRight(props) {

    const {visible, setVisible} = props;

    function onClose() {
        setVisible(false);
    }

    const mySet = ["React", 'Javascript', 'Axios', 'Router', 'useHistory', 'Redirect', 'Link', 'Material-UI', 'Ant Design'];

    return (
        <>

            <Drawer
                title="About application:"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                key="right"
                zIndex="999999"
                footer="March 2021"
            >
                {/*<HelpOutlineSharpIcon color="primary" className="spaceIcon"/> <> </>*/}
                The app was built by using the following tools:
                <ul>
                    <br/>
                    {mySet.map((el,i) => <li key={el[i]}> {el} </li>)}
                </ul>
            </Drawer>
        </>
    );
}

