import React, { useEffect } from 'react'
import Divider from '@mui/material/Divider';
function Seater() {
  return <input type="checkbox" />;
}



const SeatLayout = () => {
const SeatRender = Array.from({length:265},(index)=>{
  return <Seater/>
})
return  <div className='mx-auto container'> 
<div className=' col-lg-9 p-5 row mx-auto '>
  <div className='col-lg-4'>{SeatRender}</div><div className='col-lg-4'>{SeatRender}</div>
  <div className='col-lg-4'>{SeatRender}</div>
  </div>



<Divider className="text-center fixed-bottom col-lg-5 mx-auto  pb-5">Here's the screen</Divider>
</div>
}



export default SeatLayout