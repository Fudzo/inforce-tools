'use client'
import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';
import Link from 'next/link';

const deleteCookie = () => {
  document.cookie = 'jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
};

const Navbar = ({ userEmail, firstName, lastName, isAdmin }) => {


  function logout() {
    deleteCookie();
    window.location.href = '/login'
  }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Inforce Tools</div>

      <div>
        <ul className='flex gap-10 text-white font-bold text-2xl'>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tools">Tools</Link>
          </li>
        </ul>

      </div>

      <div className="flex items-center">
        {userEmail && <div className="text-white mr-4">{firstName} {lastName} ({userEmail})</div>}
        <div className='text-white mr-4'>
          {isAdmin ? 'Role: Admin' : 'Role: User'}
        </div>
        <button
          onClick={logout}
          className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;