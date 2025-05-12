import React from "react"

export const ChatApp = () =>{
    return(
        <>
        <div className="sticky top-16 h-[80%] w-full text-white flex flex-col justify-center items-center">
            <img src="hc-logo.png" className="h-20" alt="" />
            <div className="text-gray-800 dark:text-white flex flex-col justify-center items-center">
            <p className="text-xl">HappyChat  For Web Applications</p>
            <p>Send and receive Messages withought using your phone online.</p>
            <p>Use HappyChat on up to 4 linked devices and 1 phone at the same time.</p>
            </div>
        </div>
        </>
    )
}