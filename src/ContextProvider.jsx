import React, { useState } from "react";
import myContext from "./MyContext";

const MyContextProvider = ({children}) =>{
    const [isHidden, setIsHidden] = useState(false)
    return(
        <myContext.Provider value={{isHidden, setIsHidden}}>
            {children}
        </myContext.Provider>
    )
}

export default  MyContextProvider;