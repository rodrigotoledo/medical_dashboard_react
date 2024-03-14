import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import '../styles/agenda.css';
import '../styles/styles.css';
import '../styles/event.css';
import '../styles/month.css';
import SelectPatient from '../components/SelectPatient';
import { formatAppointmentDate, getAppointmentBackground, getAppointmentIcon } from '../functions/AppointmentsFunctions';


const localizer = momentLocalizer(moment)

const Dashboard = () => {
  const views = [Views.WEEK]
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [events, setEvents] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/appointments');
      const sortedAppointments = response.data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      setAppointments(sortedAppointments.reverse());

      const formattedEvents = response.data.map(appointment => ({
        title: appointment.description,
        start: new Date(appointment.startTime),
        end: new Date(appointment?.endTime || appointment.startTime)
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/patients');
      const patientsData = response.data.reduce((acc, patient) => {
        acc[patient.id] = { ...patient };
        delete acc[patient.id].id;
        return acc;
      }, {});
      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching fetchPatients:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [])

  useEffect(() => {
    fetchPatients();
  }, [])

  const handleReloadAppointments = () => {
    fetchAppointments();
  };
  

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className='bg-white flex md:w-1/4 w-full md:h-screen text-center flex-row md:flex-col p-2'>
          <SelectPatient />
        </div>
        <div className='md:w-3/4 md:flex-auto p-4 bg-gray-100'>
          <h1 className='font-bold hidden md:block'>Dashboard</h1>
          <div className='bg-white w-full p-4 mt-8'>
            <div>
              <Calendar
                onRangeChange={(props) => { }}
                onNavigate={(props) => { handleReloadAppointments() }}
                localizer={localizer}
                events={events}
                view={ views}
                defaultView={views}
                views={views}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onView={(newDate) => {}}
              />
            </div>
          </div>
          <div className='mt-8 bg-white w-full p-4'>
            <h1 className='font-bold hidden md:block'>Dashboard</h1>
            <div className='mt-2 border-collapse border border-slate-500 rounded-md p-2 pt-0'>
              <table className='w-full'>
                <tbody>
                {appointments?.map((appointment) => {
                  const backgroundClass = getAppointmentBackground(appointment);
                  const patient = patients[appointment.patientId];
                  return (
                    <tr key={appointment.id} className='border-b border-slate-500'>
                      <td className='h-10 py-2'>{formatAppointmentDate(appointment)}</td>
                      <td className='h-10 py-2 hidden md:block text-center'><span className={`rounded-md text-sm  ${backgroundClass} p-1 text-white`}>{appointment.status}</span></td>
                      <td className='h-10 py-2'>{patient ? patient.name : 'Loading'}</td>
                      <td className='h-10 py-2 md:flex flex-row items-center hidden space-x-1'>{getAppointmentIcon(appointment)}<span>{appointment.type}</span></td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;