import { createContext } from "react"; 
import { UseDetail } from "../app/provider";

export const UserDetailContext = createContext<UseDetail | undefined>(undefined);
