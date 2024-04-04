import React, { useState,useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useUser } from '@clerk/nextjs';
import {db} from '../../firestore/firebase'
import { collection,doc, query, where, onSnapshot } from "firebase/firestore";
import {calculateTotalData} from '../../components/firebase_operations'

export default function PieChart() {
const { user} = useUser();
const [carbonTravel,setcarbonTravel] = useState(0);
const [carbonVehicle, setcarbonVehicle] = useState(0);
const [carbonFood, setcarbonFood] = useState(0);
const [carbonElectricity, setcarbonElectricity] = useState(0);

useEffect(  () =>{
  if(user != null) {
   calculateTotalData(user?.fullName,'travel',setcarbonTravel)
  calculateTotalData(user?.fullName,'electricity',setcarbonElectricity)
  calculateTotalData(user?.fullName,'food',setcarbonFood)
  calculateTotalData(user?.fullName,'vehicle',setcarbonVehicle)
  }
},[])
{

  const data = {
    labels: ['Travel', 'Electricity', 'Waste', 'Food', 'Vehicle', 'Water'],
    datasets: [
      {
        label: '# of Votes',
        data: [carbonTravel, carbonElectricity, 0.3, carbonFood, carbonVehicle, 0.3],
        backgroundColor: [
          'red',
          'blue',
          'yellow',
          'green',
          'purple',
          'orange'
        ],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div style={{width: "450px !important"}} className='place-content-center'>
    <button onClick={calculateTotalData}>b</button>
      {/* <h2>Pie Chart</h2> */}
      {/* <Pie data={data} /> */}
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Carbon Emissions Today"
            },
            legend: {
              position: 'right', // Set the legend position to the left
            }
          },
          // responsive: true,
          // maintainAspectRatio: true,
          aspectRatio: 300 / 200 
        }}
      />
    </div>
  );
}
}