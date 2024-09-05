import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const App = () => {
let inputValue = useRef();
let [value , setValue] = useState(null) 
let [citiesArr,setCitesArray] = useState([]);

// abhi aik array declare kia ha 
// use state se is lie kia ha ke bad ma changing ho sake


const getInputValue = () =>{
  if(inputValue.current.value === '' || inputValue.current.value ===  null){
    console.log('input value is empty');
  }else{
    console.log(inputValue.current.value);
    setValue(inputValue.current.value)
  }
}



useEffect(()=>{
async function getdata(){
  const data =  await fetch(`http://api.weatherapi.com/v1/current.json?key=b4db485d7c4c485fa6d84351232508&q=${value}&aqi=no`);
  // ab yaha is array ma data push karwaonga
  console.log(await data.json());
  // pehle data ko aik variable ma dalunga
  let dataFromApi = await data.json();
  //  await data.json() yah push karwaonga
  citiesArr.push(dataFromApi);
  // yeh simple todo wala kam ha
  // ab yaha is array ki value change ho gai or us ke andar data agaya ha
  // lakin yaha setCitesArray is func ko call karake is ke andar cities

}

getdata();
},[value]);

  return (
    <><h1 className='text-2xl text-center'>hello dunia</h1>
    <div className='w-[550px] text-xl p-[20px] border-[1px] rounded flex flex-col justify-center mx-auto mt-[50px]'>
    <form className='w-[500px] flex flex-col justify-center mx-auto'>

      <input type="text" placeholder='enter your city' className='text-xl p-[5px] rounded border-[1px] mx-auto w-full' ref={inputValue} />
    </form>
    <button className='text-lg p-[5px] border-[1px] rounded mx-auto mt-[10px]' onClick={getInputValue}>Check Weather</button>

    </div>
    </>
  )
}

export default App

// abhi