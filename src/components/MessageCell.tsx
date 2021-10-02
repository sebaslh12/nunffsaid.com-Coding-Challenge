import React, { useContext } from 'react';
import styled from 'styled-components';
import { Priority } from '../Api';
import { AppContext, AppMessage } from '../App';

interface MessageCellProps {
	message: AppMessage
}

const colorPriorityMap = {
	[Priority.Error]: '#F56236',
	[Priority.Warn]: '#FCE788',
	[Priority.Info]: '#88FCA3'
};

const Container = styled.div`
	background-color: ${(props: { priority: Priority }) => colorPriorityMap[props.priority]};
	border-radius: 5px;
	height: 50px;
	margin: 5px 0;
	padding: 20px 10px;
	position: relative;
`;

const MessageText = styled.p`
	margin:0;
`;

const MessageButton = styled.button`
	background: transparent;
	bottom: 5px;
	border: none;
	padding 5px;
	position: absolute;
	right: 5px;
`;

export const MessageCell: React.FC<MessageCellProps> = ({ message }) => {
	const { messages, setMessages } = useContext(AppContext);

	const handleDeleteMessage = () => {
		const messagesSet = new Set(messages)
		messagesSet.delete(message);
		setMessages(Array.from(messagesSet))
	}

	return (
		<Container priority={message.priority}>
			<MessageText>{message.message}</MessageText>
			<MessageButton onClick={handleDeleteMessage}>Clear</MessageButton>
		</Container>
	)
}