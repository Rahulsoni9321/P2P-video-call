import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const connectSocket = async () => {
            try {
                const newSocket = io("http://localhost:5000");
                setSocket(newSocket);
            } catch (error) {
                console.error("Error connecting socket:", error);
            }
        };

        connectSocket();

        return () => {
            if (socket) {
                socket.disconnect();
                socket.emit("call ended", "User Disconnected.");
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
