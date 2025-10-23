// src/utils/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_apiURL;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
