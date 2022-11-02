import { useState } from 'react'
import Head from 'next/head'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import Table from '../components/Table'
import Form from '../components/Form'

export default function Home() {
  const [active, setActive] = useState('dashboard');

  const ShowActiveItem = () => {
    if (active === 'dashboard') return <Dashboard />
    if (active === 'database') return <Table active={active} setActive={setActive} />
    if (active === 'addGyms') return <Form />
  }

  return (
    <div>
      <Head>
        <title>Admin Panel | Over Engineered</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="A generalized admin dashboard built with production ready technologies" />
        <meta name="author" content="Prince Singh" />
        <meta name="keywords" content="admin, dashboard, gyms, postgres, postgresql, mongodb, golang, upload, view, edit, delete, secure, database, admin panel" />

        <meta property="og:title" content="Admin Panel | Over Engineered" />
        <meta property="og:description" content="A generalized admin dashboard built with production ready technologies" />
        <meta property="og:image" content="https://over-engineered.vercel.app/assets/og.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />

        <meta name="twitter:title" content="Admin Panel | Over Engineered" />
        <meta name="twitter:description" content="A generalized admin dashboard built with production ready technologies" />
        <meta name="twitter:image" content="https://over-engineered.vercel.app/assets/og.png" />
        <meta property="twitter:image:type" content="image/png" />
        <meta property="twitter:image:width" content="400" />
        <meta property="twitter:image:height" content="300" />

        <meta property="og:url" content="https://over-engineered.vercel.app" />
        <meta property="og:type" content="website" />

      </Head>

      <Sidebar active={active} setActive={setActive} />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navbar active={active} />
        <ShowActiveItem />
      </div>
    </div>
  )
}
