import { useEffect, useState } from 'react'
import './style.css'
function App() {
  const API_URL:string='https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit={pageNumber}'
  const [countries,setCountries] = useState<any[]>([])
  const [page, setPage] = useState(1);

 
  const fetchCountries = async()=>{
    try{
      const resp = await fetch(API_URL.replace('{pageNumber}',String(page*30)))
      const jsonData = await resp.json()
      setCountries(jsonData.results)
    }catch(error){
      console.log(error)
    }
  }
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 >
        document.documentElement.offsetHeight 
    ) {
      setPage(page+1)
    }
  };
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return (()=>{
      window.removeEventListener('scroll',handleScroll)
    })
  },[])

  useEffect(()=>{
    fetchCountries()
  },[page])
  return (
    <div id="app">
    <table>
      <thead>
        <td>SR.</td>
        <td>Country Name</td>
        <td>Population</td>
      </thead>
      <tbody>
        {
          countries.map((country:any,index:number)=>(<tr key={index}>
            <td>{index+1}</td>
            <td>{country?.label_en}</td>
            <td>{country?.population}</td>
          </tr>))
        }
      </tbody>
    </table>
    </div>
  )
}

export default App
