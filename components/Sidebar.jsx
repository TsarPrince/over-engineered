import { useState } from 'react'
import Link from 'next/link'

const Sidebar = ({ active, setActive }) => {

  const toggleSidebar = () => {
    const sidebar = document.querySelector('#sidebar');
    sidebar.classList.toggle('ml-[-100%]');
  }

  return (
    <aside id="sidebar" className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full h-screen flex flex-col justify-between border-r bg-white transition-all duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="bg-primary h-16 -mx-6 flex justify-center items-center">
          <Link href="/" title="home">
            <img src="/assets/logo.png" className="w-32" alt="tailus logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <img src="/assets/admin.png" alt="" className="w-16 h-16 m-auto rounded-full object-cover lg:w-24 lg:h-24" />
          <h5 className="mt-4 text-xl font-semibold text-gray-600 lg:block">Siddharth Varerkar</h5>
          <span className="text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* 
            active --> bg-gradient-blue, text-white
            default --> bg-white text-gray-600
            hover --> bg-gray-100 text-gray-600
          */}
          {/* <li>
            <a onClick={() => {setActive('dashboard'); toggleSidebar()}} aria-label="dashboard" className={`px-4 py-3 cursor-pointer flex items-center space-x-4 rounded-md group ${active === 'dashboard' ? 'text-white bg-gradient-blue' : 'text-gray-600 bg-white hover:bg-gray-100'}`}>
              <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className={`fill-current text-gray-300 ${active === 'dashboard' ? 'text-gray-100' : 'group-hover:text-primary-light'}`}></path>
                <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className={`fill-current text-gray-300 ${active === 'dashboard' ? 'text-gray-100' : 'group-hover:text-primary-light'}`}></path>
                <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className={`fill-current text-gray-600 ${active === 'dashboard' ? 'text-gray-600' : 'group-hover:text-primary'}`}></path>
              </svg>
              <span className={`${(active === 'dashboard') ? 'font-semibold' : 'font-normal'}`}>Dashboard</span>
            </a>
          </li> */}
          <li>
            <a onClick={() => {setActive('database'); toggleSidebar()}} aria-label='database' className={`px-4 py-3 cursor-pointer flex items-center space-x-4 rounded-md group ${active === 'database' ? 'text-white bg-gradient-blue' : 'text-gray-600 bg-white hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className={`fill-current text-gray-300 ${active === 'database' ? 'text-gray-100' : 'group-hover:text-primary-light'}`} fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                <path className={`fill-current text-gray-600 ${active === 'database' ? 'text-gray-600' : 'group-hover:text-primary'}`} d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
              </svg>
              <span className={`${(active === 'database') ? 'font-semibold' : 'font-normal'}`}>Database</span>
            </a>
          </li>
          <li>
            <a onClick={() => {setActive('addGyms'); toggleSidebar()}} aria-label='add gyms' className={`px-4 py-3 cursor-pointer flex items-center space-x-4 rounded-md group ${active === 'addGyms' ? 'text-white bg-gradient-blue' : 'text-gray-600 bg-white hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className={`fill-current text-gray-300 ${active === 'addGyms' ? 'text-gray-100' : 'group-hover:text-primary-light'}`} fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path className={`fill-current text-gray-600 ${active === 'addGyms' ? 'text-gray-600' : 'group-hover:text-primary'}`} d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span className={`${(active === 'addGyms') ? 'font-semibold' : 'font-normal'}`}>Add gyms</span>
            </a>
          </li>
          {/* <li>
            <a onClick={() => setActive('otherData')} aria-label='other data' className={`px-4 py-3 cursor-pointer flex items-center space-x-4 rounded-md group ${active === 'otherData' ? 'text-white bg-gradient-blue' : 'text-gray-600 bg-white hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className={`fill-current text-gray-300 ${active === 'otherData' ? 'text-gray-100' : 'group-hover:text-primary-light'}`} d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path className={`fill-current text-gray-600 ${active === 'otherData' ? 'text-gray-600' : 'group-hover:text-primary'}`} d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span className={`${(active === 'otherData') ? 'font-semibold' : 'font-normal'}`}>Other data</span>
            </a>
          </li> */}
          {/* <li>
            <a onClick={() => setActive('finance')} aria-label='finance' className={`px-4 py-3 cursor-pointer flex items-center space-x-4 rounded-md group ${active === 'finance' ? 'text-white bg-gradient-blue' : 'text-gray-600 bg-white hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className={`fill-current text-gray-300 ${active === 'finance' ? 'text-gray-100' : 'group-hover:text-primary'}`} d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path className={`fill-current text-gray-600 ${active === 'finance' ? 'text-gray-600' : 'group-hover:text-primary-light'}"`} fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              <span className={`${(active === 'finance') ? 'font-semibold' : 'font-normal'}`}>Finance</span>
            </a>
          </li> */}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar