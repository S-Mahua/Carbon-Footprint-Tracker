import { useState } from 'react';
import { setDoc, doc } from "firebase/firestore";
import { db } from '../../firestore/firebase';
import { useUser } from '@clerk/nextjs';
import {inputCarbonData } from '../../components/firebase_operations'
import QRCodeReact from 'qrcode.react';

export default function Category({ isOpen, onClose, category,  setCalculatedValue,socket ,url, statusUrl}) {
    const {user }= useUser();
    const [data, setEnergy] = useState('');
    const [vehicle, setVehicleType] = useState(0);
    
    if (!isOpen) return null;

    const handleInputChange = (event) => {
        setEnergy(event.target.value);
    };
    const handleVehicleChange = (event) => {
        setVehicleType(event.target.value);
    };

    async function setData(url,options,category,val) {
        fetch(url,options).then(async (res) => {
            var data;
            console.log(data = await res.json());
           
                    val = data.carbonEquivalent;
                   
            setCalculatedValue(val);
            inputCarbonData(category,val,user?.fullName);
            await onClose();
        }).catch((e) => {console.log(e)})
    }

    const sendMessage = async () => {

        fetch("http://localhost:3000/status",{
            method: 'POST',
            headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin': ''
            },
            body: JSON.stringify({
              statusUrl: statusUrl, // add the cluster id
              item: category, // add the wallet address
            })
          }).then(async(res) => {
            const data = await res.json()
            console.log(data)
            setCalculatedValue(data[1]);
          }).catch((e) => console.log(e))
    
    };
    

    async function updateValue() {
        await sendMessage();
        console.log(category)
        switch (category) {
            case 'uber':
                const travelUrl =  `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?vehicle=SmallDieselCar&distance=${data*10}`;
                const travelOptions = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '5f151651f9mshcf83822b9cdd731p115ed3jsnf6193d1677c8',
                        'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
                    }
                };
                setData(travelUrl,travelOptions,'travel',0);
                break;

            case 'Amazon':
                const Url =  `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?vehicle=SmallDieselCar&distance=${data*10}`;
                const Options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '7112f3b271msh36e3c9c905f726dp1e7e11jsnc2ea975060d8',
                        'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
                    }
                };
                setData(Url,Options,'travel',0);
                break;

            case 'bigbasket':
                const foodUrl = `https://foodprint.p.rapidapi.com/api/foodprint/name/${data}`;
                const foodOptions= {
                            method: 'GET',
                            headers: {
                                 'X-RapidAPI-Key': '7112f3b271msh36e3c9c905f726dp1e7e11jsnc2ea975060d8',
                    'X-RapidAPI-Host': 'foodprint.p.rapidapi.com'
                            }
                        };
               setData(foodUrl,foodOptions,category,0)
                break;

            case 'electricity':
                const Urlfood = `https://foodprint.p.rapidapi.com/api/foodprint/name/${data}`;
                const Optionsfood= {
                            method: 'GET',
                            headers: {
                                 'X-RapidAPI-Key': '7112f3b271msh36e3c9c905f726dp1e7e11jsnc2ea975060d8',
                    'X-RapidAPI-Host': 'foodprint.p.rapidapi.com'
                            }
                        };
               setData(Urlfood,Optionsfood,category,0)
                break;

            default:
                break;
        }
        await onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl mb-4">Update for today</h2>
                <QRCodeReact value={url} />
                <button onClick={updateValue} className="bg-blue-500 text-white mt-4 py-2 px-4 rounded text-lg">
                    Close
                </button>
            </div>
        </div>
    );
}