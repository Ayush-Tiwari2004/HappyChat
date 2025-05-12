import React from 'react'
import { IoMdKeypad, IoMdVideocam } from 'react-icons/io';
import { MdLinkedCamera } from 'react-icons/md';

const CallsHome = () => {
    const callingData = [
        { "id": "5", "callTitle": "Start call", "icon": "IoMdVideocam", "padding": "p-2", "bg" : "text-green-600"},
    { "id": "7", "callTitle": "New video link", "icon": "MdLinkedCamera", "padding": "p-2"},
    { "id": "hjvjhftud", "callTitle": "Call a number", "icon": "IoMdKeypad", "padding": "p-2"}
    ]
    const callListIcon = {
        IoMdVideocam : <IoMdVideocam />,
        MdLinkedCamera : <MdLinkedCamera />,
        IoMdKeypad : <IoMdKeypad />
    }
    return (
        <>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex gap-8 text-6xl">
                    {
                        callingData.map((item) => (
                            <div key={item.id} className="flex flex-col gap-3 items-center justify-center">
                                <div className={`w-fit bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 ${item.padding} ${item.bg}`}>
                                {callListIcon[item.icon]}
                                </div>
                                <p className='text-sm'>{item.callTitle}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CallsHome;
