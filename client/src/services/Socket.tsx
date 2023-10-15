import { io } from "socket.io-client";

const ENDPOINT = "https://192.168.1.4:8000"

const socket = io(ENDPOINT, {
    transports: ["websocket"]
});

export default socket