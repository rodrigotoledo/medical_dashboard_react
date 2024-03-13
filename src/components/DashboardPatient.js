import React from 'react';
import SelectPatient from './SelectPatient';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/tabs.css';

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-md">
              <h3 className='font-bold'>Patient Info</h3>
              <h1 className='mt-8 text-2xl font-bold'>Rodrigo Toledo</h1>
              <div className='flex justify-between'>
                <span>000.000.000-00</span>
                <span>51y/o</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md">
              <h3 className='font-bold'>Plan Info</h3>
              <h1 className='mt-8 text-2xl font-bold'>National Basic</h1>
              <span>000.000/1234</span>
            </div>
            <div className="bg-white p-4 rounded-md">
              <h3 className='font-bold'>Latest App</h3>
              <h1 className='mt-8 text-2xl font-bold'>Neurology</h1>
              <span>01/01/0000</span>
            </div>
          </div>

          <div className='mt-8'>
            <Tabs>
              <TabList>
                <Tab>Recent</Tab>
                <Tab className='upcoming-tab'>Upcomming</Tab>
                <Tab>History</Tab>
              </TabList>

              <TabPanel>
                <div className='w-full'>
                  <div className='flex flex-row w-full hover:bg-slate-200'>
                    <div className='p-4 flex-grow hidden md:block'>Icon</div>
                    <div className='p-4 flex-grow'>01/01/0000 00:00:00</div>
                    <div className='p-4 flex-grow hidden md:block'>followUp</div>
                    <div className='p-4 flex-grow hidden md:block'>
                      <div>
                        <span className='rounded-md text-sm  bg-red-600 p-1 text-white'>absent</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row w-full hover:bg-slate-200'>
                    <div className='p-4 flex-grow hidden md:block'>Icon</div>
                    <div className='p-4 flex-grow'>01/01/0000 00:00:00</div>
                    <div className='p-4 flex-grow hidden md:block'>followUp</div>
                    <div className='p-4 flex-grow hidden md:block'>
                      <div>
                        <span className='rounded-md text-sm  bg-green-600 p-1 text-white'>absent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 3</h2>
              </TabPanel>
            </Tabs>
          </div>
          <div className='w-full bg-white pt-10'>
            <div className="flex flex-col">
              <div className='p-4 flex-grow'>
                <div className='flex justify-between'>
                  <span className='font-bold'>Apointment Details</span>
                  <span>01/01/0000 00:00:00</span>
                </div>
              </div>
              <div className='p-4 flex flex-grow'>
                <div className='flex flex-col'>
                  <h3 className='font-bold text-xl'>Cardiology</h3>
                  <span className='p-2 md:pl-10'>text here</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPatient;