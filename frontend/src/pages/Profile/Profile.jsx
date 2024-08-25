import React from 'react'
import { useContextProvider } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const Profile = () => {

  const { profileData } = useContextProvider();

  return (
    <div className='flex flex-col items-center p-4'>
      <h1 className='text-2xl md:text-3xl font-semibold mb-4 mt-10'>Profile</h1>
      {profileData ? (
        <div className='w-full max-w-md'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium'>Name</label>
              <input
                type='text'
                value={profileData.name}
                name='name'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                disabled
              />
            </div>
            <div>
              <label htmlFor='gender' className='block text-sm font-medium'>Gender</label>
              <input
                type='text'
                value={profileData.gender}
                name='gender'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                disabled
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium'>Email</label>
              <input
                type='text'
                value={profileData.email}
                name='email'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                disabled
              />
            </div>
            <div>
              <label htmlFor='dob' className='block text-sm font-medium'>Date of Birth</label>
              <input
                type='text'
                value={profileData.dob}
                name='dob'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-200'
                disabled
              />
            </div>
          </div>
          <Link to="/" className="mt-4 relative left-40 top-10 text-center rounded-md text-white bg-blue-800 hover:bg-blue-700 px-4 py-2">Go to Home</Link>
        </div>
      ) : (
        <p className='text-gray-600'>Loading profile data...</p>
      )}
    </div>
  )
}

export default Profile
