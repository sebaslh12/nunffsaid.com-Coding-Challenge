import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('<App/>', () => {

	afterEach(cleanup);

	it('Should render app', () => {
		const comp = render(<App />);
		expect(comp).toBeTruthy();
	});

	it('Should render Header', async () => {
		const comp = render(<App />);
		await waitFor(() => screen.findByTestId('appHeader'));
		expect(comp).toBeTruthy();
	});

	it('should start populating with messages after 3000ms', async () => {
		const comp = render(<App />);
		await waitFor(() => screen.findAllByTestId('message'), { timeout: 3001 })
		expect(comp).toBeTruthy();
	});

	it('should clear messages after clicking Clear button', async () => {
		const { queryByTestId, findByTestId } = render(<App />);
		const clearButton = queryByTestId('clearButton');

		await waitFor(() => findByTestId('message'), { timeout: 3001 })
		expect(queryByTestId('message')).toBeInTheDocument();

		clearButton?.click();
		expect(queryByTestId('message')).toBeNull();
	});

	it('should clear message after clicking message Clear button', async () => {
		const { queryByTestId, findByTestId } = render(<App />);
		const clearMessageButton = queryByTestId('messageClear');

		await waitFor(() => findByTestId('message'), { timeout: 3001 })
		expect(queryByTestId('message')).toBeInTheDocument();

		clearMessageButton?.click();
		expect(queryByTestId('message')).toBeNull();
	});

	it('should stop messages after clicking Stop button', async () => {
		const { queryByTestId, findAllByTestId } = render(<App />);
		const stopButton = queryByTestId('stopButton');

		const messages = await waitFor(() => findAllByTestId('message'), { timeout: 3001 })
		expect(queryByTestId('message')).toBeInTheDocument();
		expect(messages.length).toBeGreaterThanOrEqual(1);

		stopButton?.click();
		const messagesAfterClick = await waitFor(() => findAllByTestId('message'), { timeout: 3001 })
		expect(messages.length).toBe(messagesAfterClick.length);
	});
});
