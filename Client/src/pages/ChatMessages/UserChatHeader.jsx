import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const UserChatHeader = ({ isTyping }) => {
  const { selectedUser, onlineUsers } = useSelector(state => state.user);

  const getUserStatusText = () =>{
    if(isTyping) {
      return "Typing";
    }
    if(selectedUser && onlineUsers?.includes(selectedUser._id)) {
      return "Online";
    }
    return "Ofline";
  }
  return (
    <section className='sticky top-0 left-0 z-10'>
      <div className="w-full px-4 py-2 bg-white dark:bg-gray-800 md:px-5 shadow-xl shadow-gray-100 dark:shadow-gray-950/40">
        <div className="flex w-full gap-8 items-center justify-between">
          <div className='flex items-center gap-2'>
            <NavLink to="/profile" className="md:hidden">
              <button className='h-10 w-10 grid place-content-center bg-gray-700 text-white text-2xl rounded-2xl'>
                <IoIosArrowBack />
              </button>
            </NavLink>

            <div className="flex items-center gap-3">
              <img src={selectedUser?.profile || "/dum.jpg"} className='h-10 w-10 rounded-md object-cover' alt="User Avatar" />
              <div className="text-gray-600 dark:text-white">
                <p className='font-semibold text-sm'>{selectedUser?.username || "Unknown"}</p>
                <p className='text-xs'>{getUserStatusText()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default UserChatHeader;