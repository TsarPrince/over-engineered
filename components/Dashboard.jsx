import { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_GYMDB_API_AUTH_HEADER}`
          }
        }
        const response = await axios.get('https://over-engineered.herokuapp.com/gyms', config);
        setData(response.data.gyms);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className=" px-4 md:px-6 pt-6 2xl:container">
      <div className='border-2 p-6 rounded-xl'>
        {data
          ? (<div className='flex gap-x-4 gap-y-6 flex-wrap '>
            {data.reverse().map(gym => (
              gym.images.map(url => (
                <img key={url} className='h-32 rounded-xl shadow-md' src={url} alt={url}></img>
              ))
            ))}
          </div>)
          : (<div>
            Fetching images cooler than you...
          </div>)}
      </div>
    </div>
  )
}

export default Dashboard