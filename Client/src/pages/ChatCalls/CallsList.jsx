import React from 'react'
import { UserSearchInput } from '../ChatMessages/UserSearchInput ';
import ContactListData from '../../API/ContactsListData.json'

const CallsList = () => {
  return (
    <>
    <section className="w-full md:w-[360px] h-screen flex flex-col justify-between bg-white dark:bg-gray-800 border-x border-zinc-500">
      <div className="flex flex-col h-full">
        <UserSearchInput />

        {/* contact list */}
        <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide divide-y-[1px] divide-slate-600">
          {ContactListData.map((item) => {
            return (
              <div
              key={item.id}
                  className={`'bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 flex justify-between items-center px-4 py-4 rounded-md cursor-pointer`}
                >
                  <div className="text-gray-800 dark:text-white flex items-center gap-4 flex-grow">
                    <div className="relative">
                      <img
                        src="/dum.jpg"
                        className="w-10 h-10 rounded-full"
                        alt={'s avatar'}
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <span className='text-[12px]'>{item.description.length > 25 ? item.description?.slice(0, 25) + "..." : item.description}</span>
                    </div>
                <div className="text-[12px]">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                  </div>
                </div>
            )
          })}
        </div>
      </div>
    </section>
      {/* <section>
        <div className="flex flex-col gap-3">
          <p className='text-slate-600'>Fevourites Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi nisi modi asperiores itaque! Perspiciatis aspernatur facilis placeat sapiente soluta quos, odit mollitia possimus? Quis ad voluptatibus culpa, illum quam possimus!</p>
          <div className="flex gap-2">
          <div className="text-white bg-slate-700 p-4 border-[1px] border-slate-800 rounded-full">
          <AiOutlineUsergroupAdd />
          </div>
          <p>Ayush Tiwari</p>
          </div>
        </div>
        <div className=""></div>
      </section> */}
    </>
  )
}

export default CallsList;