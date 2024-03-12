import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import { FaBriefcaseMedical, FaFileMedicalAlt, FaIdCard } from 'react-icons/fa';
import moment from 'moment'
import '../styles/agenda.css';
import '../styles/styles.css';
import '../styles/event.css';
import '../styles/month.css';

const localizer = momentLocalizer(moment)

const Dashboard = () => {
  const views = [Views.WEEK]
  var starts_at = new Date()
  var ends_at = new Date()
  ends_at = ends_at.setHours(ends_at.getHours() + 2)
  const events = [
    {
      title: 'Test',
      start: starts_at,
      end: ends_at
    }
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className='bg-white flex md:w-1/4 w-full md:h-screen text-center flex-row md:flex-col p-2'>
          <label className='font-bold flex-wrap text-nowrap p-2'>Medical Test</label>
          <select className='bg-white w-full border rounded-sm p-2'><option>Patients</option></select>
        </div>
        <div className='md:w-3/4 md:flex-auto p-4 bg-gray-100'>
          <h1 className='font-bold hidden md:block'>Dashboard</h1>
          <div className='bg-white w-full p-4 mt-8'>
            <div>
              <Calendar
                localizer={localizer}
                events={events}
                view={ views}
                defaultView={views}
                views={views}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onView={() => {}}
              />
            </div>
          </div>
          <div className='mt-8 bg-white w-full p-4'>
            <h1 className='font-bold hidden md:block'>Dashboard</h1>
            <div className='mt-2 border-collapse border border-slate-500 rounded-md p-2 pt-0'>
              <table className='w-full'>
                <tbody>
                  <tr className='border-b border-slate-500'>
                    <td className='h-10 py-2'>01/01/01 00:00:00</td>
                    <td className='h-10 py-2 hidden md:block text-center'><span className='rounded-md text-sm  bg-red-600 p-1 text-white'>absent</span></td>
                    <td className='h-10 py-2'>Rodrigo</td>
                    <td className='h-10 py-2 md:flex flex-row items-center hidden space-x-1'><FaBriefcaseMedical /><span>firstVisit</span></td>
                  </tr>
                  <tr className='border-b border-slate-500'>
                    <td className='h-10 py-2'>01/01/01 00:00:00</td>
                    <td className='h-10 py-2 hidden md:block text-center'><span className='rounded-md text-sm  bg-green-600 p-1 text-white'>completed</span></td>
                    <td className='h-10 py-2'>Rodrigo</td>
                    <td className='h-10 py-2 md:flex flex-row items-center hidden space-x-1'><FaFileMedicalAlt /><span>exam</span></td>
                  </tr>
                  <tr className='border-b border-slate-500'>
                    <td className='h-10 py-2'>01/01/01 00:00:00</td>
                    <td className='h-10 py-2 hidden md:block text-center'><span className='rounded-md text-sm  bg-green-600 p-1 text-white'>completed</span></td>
                    <td className='h-10 py-2'>Rodrigo</td>
                    <td className='h-10 py-2 md:flex flex-row items-center hidden space-x-1'><FaBriefcaseMedical /><span>surgery</span></td>
                  </tr>
                  <tr className='border-b border-slate-500'>
                    <td className='h-10 py-2'>01/01/01 00:00:00</td>
                    <td className='h-10 py-2 hidden md:block text-center'><span className='rounded-md text-sm  bg-green-600 p-1 text-white'>completed</span></td>
                    <td className='h-10 py-2'>Rodrigo</td>
                    <td className='h-10 md:flex flex-row  py-2 items-center hidden space-x-1'><FaIdCard /><span>checkUp</span></td>
                  </tr>
                  <tr className='border-b border-slate-500'>
                    <td className='py-2'>01/01/01 00:00:00</td>
                    <td className='py-2 hidden md:block text-center'><span className='rounded-md text-sm  bg-slate-500 p-1 text-white'>cancelled</span></td>
                    <td className='py-2'>Rodrigo</td>
                    <td className='h-10 md:flex flex-row  py-2 items-center hidden space-x-1'><FaBriefcaseMedical /><span>firstVisit</span></td>
                  </tr>
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