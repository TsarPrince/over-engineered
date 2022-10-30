import axios from 'axios'
import { useState, useEffect } from 'react'

const Table = ({ active, setActive }) => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const baseURL = 'https://over-engineered.herokuapp.com'
      const config = {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_GYMDB_API_AUTH_HEADER}`
        }
      }
      try {
        const res = await axios.get(`${baseURL}/gyms`, config);
        const data = res.data.gyms;
        setGyms(data);
      } catch (err) {
        console.log(err);
        alert(`Error: ${err.message}`)
      }

      setLoading(false);
    }
    fetchData();
  }, [])

  const getColor = (element) => {
    switch (element) {
      case 'lounge':
        return 'bg-blue-50 text-blue-600';
      case 'locker':
        return 'bg-violet-50 text-violet-600';
      case 'sauna':
        return 'bg-pink-50 text-pink-600';
      case 'wifi':
        return 'bg-emerald-50 text-emerald-600';
    }
  }

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gyms));
    const dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "gyms-data.json");
    dlAnchorElem.click();
  }

  return (
    <div className="px-6 pt-6 2xl:container">
      <div className='space-y-8'>

        {/* hidden link used to download json */}
        <a id='downloadAnchorElem' className='hidden'></a>

        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center'>
          <p className='text-xl md:text-2xl text-slate-700 font-semibold'>Postgres Gym table</p>
          <div className='flex space-x-2'>
            <button className='btn-outline' onClick={downloadJSON}>
              <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M13 13v5.585l1.828-1.828 1.415 1.415L12 22.414l-4.243-4.242 1.415-1.415L11 18.585V13h2zM12 2a7.001 7.001 0 0 1 6.954 6.194 5.5 5.5 0 0 1-.953 10.784v-2.014a3.5 3.5 0 1 0-1.112-6.91 5 5 0 1 0-9.777 0 3.5 3.5 0 0 0-1.292 6.88l.18.03v2.014a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2z" /></svg>
              <span>Export</span>
            </button>
            <button className='btn' onClick={() => { setActive('addGyms') }}>
              <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /></svg>
              <span>Add gym</span>
            </button>
          </div>
        </div>


        <div className='border rounded-xl overflow-x-scroll'>
          <table className="table-auto w-full text-left">
            <thead className='bg-slate-50 border-b'>
              <tr>
                <th className='py-4 text-slate-600 font-semibold' scope="col"></th>
                <th className='py-4 text-slate-600 font-semibold' scope="col">Gym</th>
                <th className='py-4 text-slate-600 font-semibold' scope="col">Location</th>
                <th className='py-4 text-slate-600 font-semibold' scope="col">Amenities</th>
                <th className='py-4 text-slate-600 font-semibold' scope="col"></th>
                <th className='py-4 text-slate-600 font-semibold' scope="col"></th>
              </tr>
            </thead>
            {
              (loading)
                ? <tbody>
                  <tr>
                    <td className='py-8 text-center font-semibold text-slate-700' colSpan={4} >
                      Loading data...
                    </td>
                  </tr>
                </tbody>

                : <tbody>
                  {gyms.map((gym, index) => (
                    <tr key={gym.ID} className='border-b'>

                      <td className='py-4 pl-4 pr-8' scope="row">{index + 1}.</td>

                      <td className='py-4 pr-8'>
                        <div className='flex items-center space-x-4 w-48'>
                          <img className='w-12 h-12 object-cover rounded-full bg-slate-700' src={`${gym.logo}`}></img>
                          <div className='flex flex-col content-center'>
                            <span className='font-semibold text-slate-700'>{gym.name}</span>
                            <span className='text-sm text-slate-500'>{gym.type}</span>
                          </div>
                        </div>
                      </td>

                      <td className='py-4 pr-8 text-slate-700 whitespace-nowrap'>
                        {gym.location}
                      </td>

                      <td className='py-4 pr-8'>
                        <div className='space-x-1'>
                          {gym.amenities.map(amenity => (
                            <span key={amenity} className={`${getColor(amenity)} px-2 py-1 rounded-full font-medium`}>{amenity}</span>
                          ))}
                        </div>
                      </td>

                      <td className='px-2'>
                        <a className='cursor-pointer'>
                          <svg className='w-5 h-5 text-slate-700 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" /></svg>
                        </a>
                      </td>
                      <td className='px-2'>
                        <a className='cursor-pointer'>
                          <svg className='w-6 h-6 text-slate-700 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" /></svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
            }
          </table>
        </div>
      </div>
    </div>


  )
}

export default Table