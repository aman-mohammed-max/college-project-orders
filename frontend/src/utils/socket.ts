import { io } from 'socket.io-client';

const URL: string | undefined = 'http://localhost:3000';

export const socket = io(URL);