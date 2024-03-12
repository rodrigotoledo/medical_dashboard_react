import React from 'react';

const SelectPatient = () => {

  return (
    <>
      <label className='font-bold flex-wrap text-nowrap p-2'>Medical Test</label>
        <select className='bg-white w-full border rounded-sm p-2'><option>Patients</option></select>
    </>
  )
}

export default SelectPatient;