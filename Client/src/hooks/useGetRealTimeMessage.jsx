import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice";

export const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store => store.socket);
    const {messages} = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            // Handle both cases - whether messages are nested or not
            const currentMessages = messages?.data?.messages || messages || [];
            dispatch(setMessages({
                ...messages,
                data: {
                    ...messages?.data,
                    messages: [...currentMessages, newMessage]
                }
            }));
        });

        return () => {
            socket?.off("newMessage");
        };
    }, [socket, messages]);
}
// export const useGetRealTimeMessage = () => {
//     const {socket} = useSelector(store => store.socket);
//     const {messages} = useSelector(store => store.message)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         socket?.on("newMessage", (newMessage) => {
//             console.log("New incoming message:", newMessage);
//       console.log("Current messages:", messages);
//             dispatch(setMessages([...messages, newMessage]));
//         }) 
//     }, [socket, messages, setMessages]);
// }
