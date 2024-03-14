import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/tabs.css';
import { formatDocument, calculateAge, formatPlanInfo} from '../functions/PatientsFunctions';
import SelectPatient from '../components/SelectPatient';
import { getAppointmentBackground, formatAppointmentDate, formatDate, getAppointmentIcon } from '../functions/AppointmentsFunctions';
import capitalize from 'capitalize';

const PatientsDashboard = () => {
  const { patient_id } = useParams();

  const [latestAppointment, setLatestAppointment] = useState([]);
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [patient, setPatient] = useState({});

  let hasFetchedAppointments = false;
  let appointments = []

  const [recentAppointments, setRecentAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [historyAppointments, setHistoryAppointments] = useState([]);
  const [appointment, setAppointment] = useState(undefined);


  const fetchAppointments = async () => {
    try {
      if(hasFetchedAppointments === false) {
        hasFetchedAppointments = true
        const response = await axios.get('/appointments');
        
        var latest = null;
        
        let _recentAppointments= []
        let _upcomingAppointments= []
        let _historyAppointments= []
        if(appointments.length === 0) {
          appointments = response.data
          appointments.forEach((_appointment) => {
            if(parseInt(_appointment.patientId) === parseInt(patient_id)){
              let appointmentData = new Date(_appointment.startTime)
              if(_appointment.type === 'followUp'){
                _recentAppointments.push(_appointment)
              }else if(appointmentData > Date.now()){
                _upcomingAppointments.push(_appointment)
              }else{
                _historyAppointments.push(_appointment)
              }
              if(latest == null){
                latest = _appointment;
              }else if (_appointment.startTime > latest.startTime) {
                latest = _appointment;
              }
              patientAppointments[_appointment.id] = _appointment;
            }
          })
        }
        _recentAppointments = _recentAppointments.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        _upcomingAppointments = _upcomingAppointments.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        _historyAppointments = _historyAppointments.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

        setRecentAppointments(_recentAppointments)
        setUpcomingAppointments(_upcomingAppointments)
        setHistoryAppointments(_historyAppointments)
        setPatientAppointments(patientAppointments);
        setLatestAppointment(latest);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatient = async (patientId) => {
    try {
      const response = await axios.get('/patients/'+patientId);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching fetchPatient:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [])

  useEffect(() => {
    fetchPatient(patient_id);
  }, [])

   const patientDocument = formatDocument(patient)
   const patientAge = calculateAge(patient)
   const planInfo = formatPlanInfo(patient)

   return (
     <div>
       <div className="flex flex-col md:flex-row">
         <div className='bg-white flex md:w-1/4 w-full md:h-screen text-center flex-row md:flex-col p-2'>
           <SelectPatient />
           <div className='hidden md:block text-right'>
            <span onClick={() => window.location='/'} className='cursor'>Back to Dashboard</span>
           </div>
         </div>
         <div className='md:w-3/4 md:flex-auto p-4 bg-gray-100'>
           <h1 className='font-bold hidden md:block'>Dashboard of: {patient?.name}</h1>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
             <div className="bg-white p-4 rounded-md">
               <h3 className='font-bold'>Patient Info</h3>
               <h1 className='mt-8 text-2xl font-bold'>{patient?.name}</h1>
               <div className='flex justify-between'>
                 <span>{patientDocument}</span>
                 <span>{patientAge}y/o</span>
               </div>
             </div>
             <div className="bg-white p-4 rounded-md">
               <h3 className='font-bold'>Plan Info</h3>
               <h1 className='mt-8 text-2xl font-bold'>{patient.insurancePlan}</h1>
               <span>{planInfo}</span>
             </div>
             <div className="bg-white p-4 rounded-md">
               <h3 className='font-bold'>Latest App</h3>
               <h1 className='mt-8 text-2xl font-bold'>{capitalize.words(latestAppointment?.specialty || '', true)}</h1>
               <span>{formatDate(latestAppointment?.startTime)}</span>
             </div>
           </div>

           <div className='mt-8'>
             <Tabs>
               <TabList>
                 <Tab>Recent ({recentAppointments.length})</Tab>
                 <Tab className='upcoming-tab'>Upcomming ({upcomingAppointments.length})</Tab>
                 <Tab>History ({historyAppointments.length})</Tab>
               </TabList>

               <TabPanel>
                 <div className='w-full'>
                  {recentAppointments.length > 0 ? (
                    <>
                    {recentAppointments.map((patientAppointment) => (
                      <div onClick={() => setAppointment(patientAppointment)} className='flex cursor flex-row w-full hover:bg-slate-200' key={patientAppointment.id}>
                        <div className='p-4 hidden md:block'>{getAppointmentIcon(patientAppointment)}</div>
                        <div className='p-4 flex-grow'>{formatAppointmentDate(patientAppointment)}</div>
                        <div className='p-4 flex-grow hidden md:block text-right'>
                          <div>
                            <span className={`rounded-md text-sm ${getAppointmentBackground(patientAppointment)} p-1 text-white`}>{patientAppointment.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    </>
                  ) : (
                    <div className='p-10'>Recent...</div>
                  )
                  }
                 </div>
               </TabPanel>
               <TabPanel>
                 <div className='w-full'>
                  {upcomingAppointments.length > 0 ? (
                    <>
                    {upcomingAppointments.map((patientAppointment) => (
                      <div onClick={() => setAppointment(patientAppointment)} className='flex cursor flex-row w-full hover:bg-slate-200' key={patientAppointment.id}>
                        <div className='p-4 hidden md:block'>{getAppointmentIcon(patientAppointment)}</div>
                        <div className='p-4 flex-grow'>{formatAppointmentDate(patientAppointment)}</div>
                        <div className='p-4 flex-grow hidden md:block text-right'>
                          <div>
                            <span className={`rounded-md text-sm ${getAppointmentBackground(patientAppointment)} p-1 text-white`}>{patientAppointment.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    </>
                  ) : (
                    <div className='p-10'>Upcomming...</div>
                  )
                  }
                 </div>
               </TabPanel>
               <TabPanel>
                 <div className='w-full'>
                  {historyAppointments.length > 0 ? (
                    <>
                    {historyAppointments.map((patientAppointment) => (
                      <div onClick={() => setAppointment(patientAppointment)} className='flex cursor flex-row w-full hover:bg-slate-200' key={patientAppointment.id}>
                        <div className='p-4 hidden md:block'>{getAppointmentIcon(patientAppointment)}</div>
                        <div className='p-4 flex-grow'>{formatAppointmentDate(patientAppointment)}</div>
                        <div className='p-4 flex-grow hidden md:block text-right'>
                          <div>
                            <span className={`rounded-md text-sm ${getAppointmentBackground(patientAppointment)} p-1 text-white`}>{patientAppointment.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    </>
                  ) : (
                    <div className='p-10'>History...</div>
                  )
                  }
                 </div>
               </TabPanel>
             </Tabs>
           </div>
           {appointment !== undefined && (
           <div className='w-full bg-white pt-10'>
             <div className="flex flex-col">
               <div className='p-4 flex-grow'>
                 <div className='flex justify-between'>
                   <span className='font-bold'>Apointment Details</span>
                   <span>{formatDate(appointment.startTime)}</span>
                 </div>
               </div>
               <div className='p-4 flex flex-grow'>
                 <div className='flex flex-col'>
                   <h3 className='font-bold text-xl'>{capitalize.words(appointment.specialty, true)}</h3>
                   <span className='p-2 md:pl-10'>{appointment.description}</span>
                 </div>
               </div>
             </div>
           </div>
           )}
         </div>
       </div>
     </div>
   )

}

export default PatientsDashboard;