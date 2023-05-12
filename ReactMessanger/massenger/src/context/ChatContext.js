
import { createContext, useContext, useReducer } from "react";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()



export const ChatContextProvider = ({ children }) => {
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: "null",
        user:{}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: action.payload.chatId
                }
                break;
        
            default:
                return state
                break;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    
    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}