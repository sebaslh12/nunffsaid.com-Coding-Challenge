import React, { Fragment, useContext } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { AppContext } from '../App';

const Header = () => {
	const { toggleMessageReceiver, isReceiverEnabled, clearMessages } = useContext(AppContext);
	return (
		<Fragment>
			<h1>nunffsaid.com Coding Challenge</h1>
			<Divider />
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1 }}>
				<Button sx={{ mr: '5px', backgroundColor: '#88FCA3', color: 'black' }} onClick={toggleMessageReceiver} variant="contained">{isReceiverEnabled ? 'Stop' : 'Start'}</Button>
				<Button onClick={clearMessages} sx={{ backgroundColor: '#88FCA3', color: 'black' }} variant="contained">Clear</Button>
			</Box>
		</Fragment>
	)
}

export default Header;