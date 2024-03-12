import React from 'react';
import SelectPatient from './SelectPatient';
import { useParams } from 'react-router-dom';

const DashboardPatient = () => {
  let { client_id } = useParams();

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className='bg-white flex md:w-1/4 w-full md:h-screen text-center flex-row md:flex-col p-2'>
          <SelectPatient />
        </div>
        <div className='md:w-3/4 md:flex-auto p-4 bg-gray-100'>
          <h1 className='font-bold hidden md:block'>By Patient {client_id}</h1>
        </div>
      </div>
    </div>
  )
}

export default DashboardPatient;