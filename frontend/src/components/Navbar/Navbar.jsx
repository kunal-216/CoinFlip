import React from 'react'
import { GiCoinflip } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useContextProvider } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"

const Navbar = () => {

    const { token, setToken } = useContextProvider();
    const navigate = useNavigate();

    const logoutHandler = () => {
        try {
            localStorage.removeItem("token");
            navigate("/")
            setToken(null)
            toast.success("Logout Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    return (
        <div className='flex flex-col md:flex-row justify-between items-center p-4'>
            <Link to="/" className='mb-4 md:mb-0'>
                <GiCoinflip size={60} className='md:relative left-0' />
            </Link>
            <h1 className='text-3xl relative left-12 md:text-5xl font-bold bg-gradient-to-r from-red-500 to-purple-800 bg-clip-text text-transparent mb-4 md:mb-0'>CoinFlip Game</h1>
            {token ?
                <div className='flex items-center'>
                    <Link to="/profile" className='mr-4'>
                        <FaUserCircle className='w-10 h-10 rounded-full' />
                    </Link>
                    <button onClick={logoutHandler} className='px-4 py-2 text-lg bg-purple-500 text-white rounded-xl'>Logout</button>
                </div>
                :
                <div className='flex items-center'>
                    <Link to="/user" className='mr-4'>
                        <FaUserCircle className='w-10 h-10 rounded-full' />
                    </Link>
                    <Link to="/user" className='px-4 py-2 text-lg bg-purple-500 text-white rounded-xl'>Sign Up</Link>
                </div>
            }
        </div>
    )
}

export default Navbar
