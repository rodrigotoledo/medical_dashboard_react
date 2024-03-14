import axios from 'axios';

const usePatient = async (patientId) => {
  try {
    const response = await axios.get('/patients/'+patientId);
    return response.data
  } catch (error) {
    console.error('Error fetching patient:', error);
  }
};

const fetchPatients = async () => {
  try {
    const response = await axios.get('/patients');
    const patientsData = response.data.reduce((acc, patient) => {
      acc[patient.id] = patient;
      return acc;
    }, {});
    return patientsData;
  } catch (error) {
    console.error('Error fetching patients:', error);
  }
};

const formatDocument = (patient) => {
  let patientDocument = null;
  if(patient && patient.document !== undefined){
    patientDocument = patient.document.toString()
    
    patientDocument = patientDocument.replace(/\D/g, '');
    return patientDocument.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}

const formatPlanInfo = (patient) => {
  let healthSystemId = null;
  if(patient && patient.healthSystemId !== undefined){
    healthSystemId = patient.healthSystemId.toString()
    
    healthSystemId = healthSystemId.replace(/\D/g, '');
    healthSystemId = healthSystemId.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2/$3');
    return healthSystemId
  }
}

function calculateAge(patient) {
  let birthday = null;
  if(patient !== undefined) {
    birthday = patient.birthday
    const today = new Date();
    const birth = new Date(birthday);
    
    let age = today.getFullYear() - birth.getFullYear();
    const currentMonth = today.getMonth();
    const birthMonth = birth.getMonth();
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }
}

export { fetchPatients, usePatient, formatDocument, formatPlanInfo, calculateAge };