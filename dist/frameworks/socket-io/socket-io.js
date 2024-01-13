"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketManager = (io) => {
    const emailToSocketIdMap = new Map();
    const socketIdToEmailMap = new Map();
    io.on("connection", (socket) => {
        console.log("VideoCall socket conn");
        // Video
        socket.on("room:join", (data) => {
            console.log("socket id-", socket.id);
            const { email, room } = data;
            console.log("room join-", email, room);
            emailToSocketIdMap.set(email, socket.id);
            socketIdToEmailMap.set(socket.id, email);
            io.to(room).emit("user:joined", { email, id: socket.id });
            socket.join(room);
            io.to(socket.id).emit("room:join", data);
        });
        socket.on("user:call", ({ to, offer }) => {
            console.log("incoming:call-", to, offer);
            io.to(to).emit("incoming:call", { from: socket.id, offer });
        });
        socket.on("call:accepted", ({ to, ans }) => {
            console.log("call:accepted-", to, ans);
            io.to(to).emit("call:accepted", { from: socket.id, ans });
        });
        socket.on("peer:nego:needed", ({ to, offer }) => {
            console.log("peer:nego:needed-", to, offer);
            io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
        });
        socket.on("peer:nego:done", ({ to, ans }) => {
            console.log("peer:nego:done-", to, ans);
            io.to(to).emit("peer:nego:final", { from: socket.id, ans });
        });
        socket.on("socket:disconnect", ({ socketId }) => {
            // Handle socket disconnection
            const email = socketIdToEmailMap.get(socketId);
            console.log("socket:disconnect-", email);
            if (email) {
                emailToSocketIdMap.delete(email);
                socketIdToEmailMap.delete(socketId);
            }
            const targetSocket = io.sockets.sockets.get(socketId);
            if (targetSocket) {
                targetSocket.disconnect();
            }
        });
    });
};
exports.default = socketManager;
