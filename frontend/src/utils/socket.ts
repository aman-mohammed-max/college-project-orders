import { io } from "socket.io-client";

const URL: string | undefined = import.meta.env.VITE_API_HOST as string;

export const socket = io(URL);
