import { Server, Socket } from "socket.io";

interface UserData {
  _id: string;
}

const socketManager = (io: Server) => {
  const emailToSocketIdMap = new Map<string, string>();
  const socketIdToEmailMap = new Map<string, string>();

  io.on("connection", (socket: Socket) => {
    console.log("VideoCall socket conn");
    // Video
    socket.on("room:join", (data: { email: string; room: string }) => {
        console.log("socket id-", socket.id);
        const { email, room } = data;
        console.log("room join-", email, room);
      emailToSocketIdMap.set(email, socket.id);
      socketIdToEmailMap.set(socket.id, email);
      io.to(room).emit("user:joined", { email, id: socket.id });
      socket.join(room);
      io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({ to, offer }: { to: string; offer: any }) => {
      console.log("incoming:call-", to, offer);
      io.to(to).emit("incoming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }: { to: string; ans: any }) => {
      console.log("call:accepted-", to, ans);
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on(
      "peer:nego:needed",
      ({ to, offer }: { to: string; offer: any }) => {
        console.log("peer:nego:needed-", to, offer);
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
      }
    );

    socket.on("peer:nego:done", ({ to, ans }: { to: string; ans: any }) => {
      console.log("peer:nego:done-", to, ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

    socket.on("socket:disconnect", ({ socketId }: { socketId: string }) => {
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

export default socketManager;
