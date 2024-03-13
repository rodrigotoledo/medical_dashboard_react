import React from 'react';

const SelectPatient = ({patients}) => {

  return (
    <>
      <label className='font-bold flex-wrap text-nowrap p-2'>Medical Test</label>
      <select className='bg-white w-full border rounded-sm p-2'>
        <option>Patients</option>
        {patients !== undefined && patients.map((patient) => {
          return (
            <option value={patient} key={patient.id}>{patient.name}</option>
          )
        })}
      </select>
    </>
  )
}

export default SelectPatient;