import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectPatient = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

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