import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AppContext } from '../App';

const SnackMessage = () => {
	const { snackMessage, setSnackMessage } = useContext(AppContext);

	const handleClose = () => {
		setSnackMessage('')
	}

	return (
		<Snackbar open={!!snackMessage} autoHideDuration={1999} onClose={handleClose}>
			<MuiAlert onClose={handleClose} severity='error'>
				{snackMessage}
			</MuiAlert>
		</Snackbar>
	)
}

export default SnackMessage;