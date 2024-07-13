'use client'
import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';

const deleteCookie = () => {
  document.cookie = 'jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
};

const Navbar = ({ userEmail, firstName, lastName, isAdmin }) => {


  function logout() {
    deleteCookie();
    window.location.href = '/login'
  }

  console.log(firstName)
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Inforce Tools</div>
      <div className="flex items-center">
        {userEmail && <div className="text-white mr-4">{firstName} {lastName} ({userEmail})</div>}
        <div className='text-white mr-4'>
        {isAdmin ? 'Role: Admin' : 'Role: User'}
        </div>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;