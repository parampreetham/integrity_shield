'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/viewManufacturer');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h1 className='text-center text-2xl font-bold mt-3'>Manufacturers List</h1>
      <div className='mt-5 block m-auto text-center ml-32 mr-32'>
        <div className='flex flex-between  mt-3 text-center align-middle bg-blue-300 p-2 rounded rounded-b-none'>
          <p className='w-44 font-bold'>ID</p>
          <p className='w-44 font-bold'>Name</p>
          <p className='w-44 font-bold'>Email</p>
          <p className='w-44 font-bold'>Ph No</p>
        </div>
        {users.map((user, index) => (
          <div key={index} className='flex justify-between items-center bg-blue-400 p-2 hover:bg-blue-200'>
            <p className='w-44 text-center font-bold'>{user.mId}</p>
            <p className='w-44 text-center'>{user.name}</p>
            <p className='w-44 text-center'>{user.email}</p>
            <p className='w-44 text-center'>{Number(user.phoneNumber)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListPage;
