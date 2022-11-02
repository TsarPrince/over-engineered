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
        <meta property="og:image:width" content="417" />
        <meta property="og:image:height" content="391" />

        <meta property="og:url" content="https://over-engineered.vercel.app" />
        <meta property="og:type" content="website" />

        {/* <meta name="twitter:title" content="My Pets Life" /> */}
        {/* <meta name="twitter:description" content="Never Miss Your Pet's Schedule and Activity" /> */}
        {/* <meta name="twitter:image" content="https://d2m3ee76kdhdjs.cloudfront.net/static_assets/1200*630.png" /> */}
        {/* <meta name="twitter:image" content="https://d3vtczj1cfkpaj.cloudfront.net/assets/ogimage-min.jpg" /> */}
        {/* <meta name="twitter:image" content="https://s3.ap-south-1.amazonaws.com/techgabbar.com/assets/websit-og-image-min.png" /> */}
        {/* <meta name="twitter:image" content="https://s3.ap-south-1.amazonaws.com/techgabbar.com/assets/wesbite-og-image.png" /> */}
        {/* <meta property="twitter:image:type" content="image/png" /> */}
        {/* <meta property="twitter:image:width" content="800" /> */}
        {/* <meta property="twitter:image:height" content="800" /> */}

      </Head>

      <Sidebar active={active} setActive={setActive} />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navbar active={active} />
        <ShowActiveItem />
      </div>
    </div>
  )
}
