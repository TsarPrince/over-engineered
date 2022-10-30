import React from 'react'

const Navbar = ({ active }) => {
  const toggleSidebar = () => {
    const sidebar = document.querySelector('#sidebar');
    sidebar.classList.toggle('ml-[-100%]');
  }
  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div className="px-6 flex items-center space-x-4 2xl:container">
        {/* Expand */}
        <button className="w-12 h-16 -ml-6 pl-6 pr-12 border-r lg:hidden" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h5 className="text-xl lg:text-2xl text-gray-600 font-medium lg:block">{active.charAt(0).toUpperCase() + active.slice(1)}</h5>
      </div>
    </div>
  )
}

export default Navbar