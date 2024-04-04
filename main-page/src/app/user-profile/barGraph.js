import React, { useEffect , useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {calculateMonthlyData} from '../../components/firebase_operations'
import { useUser } from '@clerk/nextjs';

const BarGraph = () => {
    const [dataArray,setDataArray] = useState([10,30,410,43,11,0])
    const {user} = useUser()
    useEffect( () => {
     if(user != undefined) {
        for (let i = 1; i <= 6; i++) {

            calculateMonthlyData(user?.fullName,dataArray,i,setDataArray);
            console.log(dataArray[i-1])
        }
     }
    },[])
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Monthly Statistics',
                data: dataArray,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div>
            <h2>Bar Graph</h2>
            <Bar
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Carbon Emission this month"
                        }
                    },
                    // maintainAspectRatio: false,
                    width:500,
                    height:3000,
                    responsive: true,
                }}
            />
        </div>
    );
};

export default BarGraph;