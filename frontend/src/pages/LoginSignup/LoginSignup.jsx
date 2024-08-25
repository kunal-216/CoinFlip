import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContextProvider } from '../../context/StoreContext';

const LoginSignup = () => {
    const navigate = useNavigate();
    const { setToken, url } = useContextProvider();

    const [showPassword, setShowPassword] = useState(false);
    const [currState, setCurrState] = useState('Sign Up');
    const [data, setData] = useState({
        name: '',
        email: '',
        gender: '',
        password: '',
        dob: '',
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }

        try {
            let response;
            if (currState === "Login") {
                response = await axios.post(newUrl, {
                    email: data.email,
                    password: data.password,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await axios.post(newUrl, {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    gender: data.gender,
                    dob: data.dob
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            if (response.status === 200) {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    gender: "",
                    dob: "",
                });
                navigate('/');
                localStorage.setItem("token", response.data.token);
                setToken(response.data.token);
                toast.success('Successfully logged in!');
            } else {
                console.log("Something went wrong")
                toast.error(response.data.message || 'Something went wrong.');
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const passwordToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center p-4">
            <form className="bg-white shadow-md rounded-lg px-6 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={submitHandler}>
                <h2 className="text-xl md:text-2xl font-bold text-center mb-6">{currState}</h2>
                <div className="mb-4">
                    {currState === 'Sign Up' && (
                        <>
                            <input type="text" name="name" placeholder="Enter your Name"
                                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={onChangeHandler} value={data.name} required />
                            <select name="gender" className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={onChangeHandler} value={data.gender} required>
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </>
                    )}
                    <input type="email" name="email" placeholder="Enter your Email"
                        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={onChangeHandler} value={data.email} required />
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            onChange={onChangeHandler} value={data.password} required />
                        <div onClick={passwordToggle} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    {currState === 'Sign Up' && (
                        <input type="date" name="dob" placeholder="Enter your Date of Birth"
                            className="w-full px-3 py-2 my-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={onChangeHandler} value={data.dob} required />
                    )}
                </div>
                <div className="mb-6 flex items-start">
                    <input type="checkbox" className="mr-2 mt-1 leading-tight" required />
                    <p className="text-sm text-gray-600">
                        By continuing, I agree to the{' '}
                        <a href="#" className="text-blue-500 hover:underline">terms of use</a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-500 hover:underline">privacy policy</a>.
                    </p>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    {currState === 'Sign Up' ? 'Create Account' : 'Login'}
                </button>
                {currState === 'Login' ? (
                    <p className="mt-4 text-center text-sm text-gray-600 cursor-pointer" onClick={() => setCurrState('Sign Up')}>
                        Create a new Account?{' '}
                        <span className="text-blue-500 hover:underline">Click Here</span>
                    </p>
                ) : (
                    <p className="mt-4 text-center text-sm text-gray-600 cursor-pointer" onClick={() => setCurrState('Login')}>
                        Already have an Account?{' '}
                        <span className="text-blue-500 hover:underline">Login Here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginSignup;
