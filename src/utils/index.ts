import { AppMessage } from '../App';

export const messagesByPriority = (priority: number, messages: AppMessage[]) => messages.filter((message:AppMessage)=> message.priority === priority)
