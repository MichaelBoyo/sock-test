import { io } from "socket.io-client";
// export const baseUrl = "http://192.168.100.108:3000";
export const baseUrl = "https://api.bustleup.com";
export const socket = io(baseUrl);
