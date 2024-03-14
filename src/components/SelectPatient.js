import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SelectPatient = () => {
  const { patient_id } = useParams();
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

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if(selectedOption !== undefined){
      window.location.href = '/by_patient/' + selectedOption;
    }
  };

  return (
    <>
      <label className='font-bold flex-wrap text-nowrap p-2'>Medical Test</label>
      <select value={patient_id !== undefined ? parseInt(patient_id) : ''} className='bg-white w-full border rounded-sm p-2' onChange={(e) => handleSelectChange(e)}>
        <option>Patients</option>
        {patients !== undefined && patients.map((patient) => {
          return (
            <option value={parseInt(patient.id)} key={patient.id}>{patient.name}</option>
          )
        })}
      </select>
    </>
  )
}

export default SelectPatient;