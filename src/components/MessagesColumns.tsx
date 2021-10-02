import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';

import { AppContext } from '../App';
import { messagesByPriority } from '../utils';
import { MessageCell } from './MessageCell';

interface MessageColumnProps {
	title: string,
	priority: number,
}

const MessageColumn: React.FC<MessageColumnProps> = ({ priority, title }) => {
	const { messages } = useContext(AppContext);

	const messagesGivenPriority = messagesByPriority(priority, messages);
	return (
		<Grid item md={3}>
			<h2>{title}</h2>
			<p>Count: {messagesGivenPriority.length}</p>
			{messagesGivenPriority.map(msg =>
				<MessageCell key={msg?.message} message={msg} />
			)}
		</Grid>
	)
}

export default MessageColumn;
