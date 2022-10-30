import { useState } from 'react'
import Head from 'next/head'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import Form from '../components/Form'

export default function Home() {
  const [active, setActive] = useState('database');

  const ShowActiveItem = () => {
    if (active === 'database') return <Table active={active} setActive={setActive} />
    if (active === 'addGyms') return <Form />
  }

  return (
    <div>
      <Head>
        <title>Admin Panel | Your Fitness Coach</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Sidebar active={active} setActive={setActive} />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Navbar active={active} />
        <ShowActiveItem />
      </div>
    </div>
  )
}
