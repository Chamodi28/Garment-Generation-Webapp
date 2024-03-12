import {Link} from 'react-router-dom'

const ImgCard = ({image, title, desc, link}) => {
  return (
    <>
      <div className="max-w-xs rounded-lg shadow bg-gray-800 border-gray-700">
        <div className='w-full aspect-square'>
            <img className="rounded-t-lg" src={image} alt="" />
        </div>
        <div className="p-5">
            <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{title}</h5>
            </div>
            <p className="mb-3 font-normal text-gray-400">{desc}</p>
            <div className="text-center">
              <Link to={link} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300">
                  Try Now
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </Link>
            </div>
        </div>
      </div>
    </>
  )
}
export default ImgCard