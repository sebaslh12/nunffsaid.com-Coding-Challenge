import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import generateMessage, { Message, Priority } from './Api';
import Grid from '@mui/material/Grid';

import MessageColumn from './components/MessagesColumns';
import SnackMessage from './components/SnackMessage';
import Header from './components/Header';

const TITLES = {
	0: 'Error Type 1',
	1: 'Warning Type 2',
	2: 'Info Type 3'
}

export interface AppMessage extends Message {
	eid: string
}

interface AppContextState {
	snackMessage: string,
	setSnackMessage: React.Dispatch<React.SetStateAction<string>>,
	messages: AppMessage[],
	setMessages: React.Dispatch<React.SetStateAction<AppMessage[]>>,
	isReceiverEnabled: boolean,
	toggleMessageReceiver: (event: React.MouseEvent<HTMLButtonElement>) => void,
	clearMessages: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export const AppContext = React.createContext<AppContextState>({
	snackMessage: '',
	setSnackMessage: () => { },
	messages: [],
	setMessages: () => { },
	isReceiverEnabled: true,
	toggleMessageReceiver: () => { },
	clearMessages: () => { }
});

const App: React.FC<{}> = () => {
	const [messages, setMessages] = useState<AppMessage[]>([]);
	const [snackMessage, setSnackMessage] = useState<string>("");
	const [isReceiverEnabled, setIsReceiverEnabled] = useState<boolean>(true);

	useEffect(() => {
		if (isReceiverEnabled) {
			const cleanUp = generateMessage((message: Message) => {
				const msg: AppMessage = {
					...message,
					eid: uuidv4()
				}
				setMessages(oldMessages => [...oldMessages, msg]);
				if (msg.priority === Priority.Error) setSnackMessage(msg.message);
			});
			return cleanUp;
		}
	}, [isReceiverEnabled]);

	const clearMessages = () => {
		setMessages([]);
	}

	const toggleMessageReceiver = () => setIsReceiverEnabled(!isReceiverEnabled);

	return (
		<div>
			<AppContext.Provider value={{ snackMessage, setSnackMessage, clearMessages, toggleMessageReceiver, isReceiverEnabled, messages, setMessages }}>
				<Header />
				<SnackMessage />
				<Grid container wrap='nowrap' justifyContent='space-evenly'>
					<MessageColumn title={TITLES[Priority.Error]} priority={Priority.Error} />
					<MessageColumn title={TITLES[Priority.Warn]} priority={Priority.Warn} />
					<MessageColumn title={TITLES[Priority.Info]} priority={Priority.Info} />
				</Grid>
			</AppContext.Provider>
		</div>
	);
}

export default App;
