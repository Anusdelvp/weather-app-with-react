// import React, { useState } from 'react'
// import { useRef } from 'react'
// import { useEffect } from 'react'

// const App = () => {
// let inputValue = useRef();
// let [value , setValue] = useState(null) 
// let [citiesArr,setCitesArray] = useState([]);



// const getInputValue = () =>{
//   if(inputValue.current.value === '' || inputValue.current.value ===  null){
//     console.log('input value is empty');
//   }else{
//     console.log(inputValue.current.value);
//     setValue(inputValue.current.value)
//   }
// }



// useEffect(()=>{
// async function getdata(){
//   if(value === "" || value === null){
// return
//   }

//   const data =  await fetch(`http://api.weatherapi.com/v1/current.json?key=b4db485d7c4c485fa6d84351232508&q=${value}&aqi=no`);
//   citiesArr.push(await data.json())
//   console.log(citiesArr)
  
//   setCitesArray([...citiesArr])
// }

// getdata();
// },[value]);

//   return (
//     <><h1 className='text-2xl text-center'>hello dunia</h1>
//     <div className='w-[550px] text-xl p-[20px] border-[1px] rounded flex flex-col justify-center mx-auto mt-[50px]'>
//     <form className='w-[500px] flex flex-col justify-center mx-auto'>

//       <input type="text" placeholder='enter your city' className='text-xl p-[5px] rounded border-[1px] mx-auto w-full' ref={inputValue} />
//     </form>
//     <button className='text-lg p-[5px] border-[1px] rounded mx-auto mt-[10px]' onClick={getInputValue}>Check Weather</button>
//     </div>
// {citiesArr.length > 0 ?  (citiesArr.map((item , index)=>
// {
//   return <div key={index}><h1>{item.location.name}</h1>
//    <h1>{item.current.temp_c}</h1>
  
  
//   </div>
            
   

// }



// )):(<h1>no data</h1>)}

//     </>
//   )
// }

// export default App

// // abhi

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const value = useRef();
  const [userCity, setUserCity] = useState('');
  const [citiesArr, setCitiesArr] = useState([]);


  const checkInputValue = () => {

    if ( value.current.value === '' || value.current.value === null) {
        alert('Please enter city');
    }else{
        setUserCity(value.current.value);
    }
    value.current.value = '';
  };


function handleDelete(index){
citiesArr.splice(index,1);
setCitiesArr([...citiesArr]);
}

  useEffect(() => {
    const getData = async () => {
      if (userCity === '') {
        return;
      }
      try {
        const response = await axios(
          `http://api.weatherapi.com/v1/current.json?key=b4db485d7c4c485fa6d84351232508&q=${userCity}&aqi=no`
        );
        citiesArr.push(response.data)

        setCitiesArr([...citiesArr]);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [userCity]);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <input
          type="text"
          placeholder="Enter city name"
          ref={value}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <div className='flex justify-center'>

        <button
          onClick={checkInputValue}
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300"
          >
          Show
        </button>
            </div>
        {citiesArr.length > 0 ? (
          <div className="mt-6">
            {citiesArr.reverse().map((item, index) => (
               <div
               key={index}
               className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative"
             >
               <button
                 onClick={() => handleDelete(index)}
                 className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-6 w-6"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                 >
                   <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M6 18L18 6M6 6l12 12"
                   />
                 </svg>
               </button>
               <h1 className="text-xl font-semibold">{item.location.name}</h1>
               <h2 className="text-lg">
                 Temperature: {item.current.temp_c} °C / {item.current.temp_f} °F
               </h2>
               <p className="text-gray-700">{item.current.condition.text}</p>
               <img
                 src={item.current.condition.icon}
                 alt={item.current.condition.text}
                 className="w-12 h-12 mt-2"
               />
             </div>
            ))}
          </div>
        ) : (
          <h1 className="text-xl text-gray-500 mt-4">No result found</h1>
        )}
      </div>
    </div>
  );
};

export default App;

