import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import Main from "./components/Main"
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null) // for rendering from api
  const [loading, setLoading] = useState(false) // for loading from api
  const [showModal, setShowModal] = useState(false); // for showing sidebar

  // show the modal menue
  const handleToggleModal = () => {
    setShowModal(!showModal)
  };

  // fetch data for ADOP 
  useEffect(() => {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY; // define API key

    // async function to NASA APOD API
    const fetchAPIData = async () => {
      const url = "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`
    
      //cache data
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }

      // clear local storage from previous day
      localStorage.clear()

      try {
        const response = await fetch(url); // fetch the data from url
        const apiData = await response.json(); // return json
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from cache new')
      }catch (e) {
        console.error(e.message)
      }
    
    };
    fetchAPIData();
  }, []);

  return (
    
   <>
   
    {data ? (<Main data={data} handleToggleModal={handleToggleModal}/>) : (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
    {showModal && 
      (<SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
    {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)}
   </>
  )
}

export default App
