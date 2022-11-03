import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import axios from 'axios'

const Dashboard = ({ posts }) => {
  const [data, setData] = useState(null);

  const portableTextComponents = {
    types: {
      image: ({ value }) => <img className='mx-auto rounded-xl my-16' src={urlFor(value)} />,
    },

    list: {
      bullet: ({children}) => <ul className="ml-8 my-4 list-disc marker:text-blue-500">{children}</ul>,
    },
    
    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a className='text-blue-400 font-semibold underline' href={value.href} rel={rel}>
            {children}
          </a>
        )
      },
      strong: ({ text }) => {
        return <span className='text-pink-400 font-bold'>{text}</span>
      },
    },
  }

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
      {
        posts.map(post => {
          return (
            <PortableText key={post.slug.current} value={post.body} components={portableTextComponents} />
          )
        })
      }
      <div className='border-2 p-6 rounded-xl'>
        {data
          ? (<div className='flex gap-x-4 gap-y-6 flex-wrap '>
            {data.reverse().map(gym => (
              gym.images.map(url => (
                <div key={url}>
                  <img className='h-32 rounded-xl shadow-md' src={url} alt={url}></img>
                </div>
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



export default Dashboard;