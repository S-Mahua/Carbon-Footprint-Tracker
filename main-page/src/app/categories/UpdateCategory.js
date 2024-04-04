import { useState } from 'react';
import { setDoc, doc } from "firebase/firestore";
import { db } from '../../firestore/firebase';
import { useUser } from '@clerk/nextjs';
import { inputCarbonData } from '../../components/firebase_operations'

export default function Category({ isOpen, onClose, category, setCalculatedValue }) {
    const { user } = useUser();
    const [data, setEnergy] = useState('');
    const [vehicle, setVehicleType] = useState("SmallDieselCar");

    let vehicleTypes = {
    "option1": "SmallDieselCar",
    "option2": "SmallPetrolCar",
    "option3": "SmallGasCar",
    "option4": "LargeDieselCar",
    "option5": "LargePetrolCar",
    "option6": "LargeGasCar",
    "option7" : "SmallMotorBike",
    }

    if (!isOpen) return null;

    const handleInputChange = (event) => {
        console.log("called")
        setEnergy(event.target.value);
    };
    const handleVehicleChange = (event) => {
        console.log("called2")
        console.log(event.target.value);
        console.log(vehicleTypes[event.target.value]);
        setVehicleType(vehicleTypes[event.target.value]);
    };

    async function setData(url, options, category, val) {
        fetch(url, options).then(async (res) => {
            var data;
            console.log(data = await res.json());
            switch (category) {
                case 'travel':
                    val = data.carbonEquivalent;
                    break;
                case 'vehicle':
                    val = data.carbonEquivalent;
                    break;
                case 'food':
                    val = data[0].footprint
                    break;
                case 'electricity':
                    val = data.co2e;
                    break;
                default:
                    break;
            }
            setCalculatedValue(val);
            inputCarbonData(category, val, user?.fullName);
            await onClose();
        }).catch((e) => { console.log(e) })
    }


    async function updateValue() {
        console.log(category)
        switch (category) {
            case 'travel':
                const travelUrl = `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?vehicle=SmallDieselCar&distance=${data}`;
                const travelOptions = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '5f151651f9mshcf83822b9cdd731p115ed3jsnf6193d1677c8',
                        'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
                    }
                };
                setData(travelUrl, travelOptions, category, 0);
                break;

            case 'vehicle':
                console.log(vehicle)
                console.log(data)
                const vehicleUrl = `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?vehicle=${vehicle}&distance=${data}`
                console.log(vehicleUrl)
                const vehicleOptions = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '5f151651f9mshcf83822b9cdd731p115ed3jsnf6193d1677c8',
                        'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
                    }
                };


                setData(vehicleUrl, vehicleOptions, category, 0)
                break;

            case 'food':
                const foodUrl = `https://foodprint.p.rapidapi.com/api/foodprint/name/${data}`;
                const foodOptions = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '7112f3b271msh36e3c9c905f726dp1e7e11jsnc2ea975060d8',
                        'X-RapidAPI-Host': 'foodprint.p.rapidapi.com'
                    }
                };
                setData(foodUrl, foodOptions, category, 0)
                break;

            case 'electricity':
                const authToken = "QDMV9AG3NJ47S6GV4HP0BY65X71R";
                const electricityUrl = "https://api.climatiq.io/data/v1/estimate";
                const electricityOptions = {
                    method: "POST",
                    headers: { 'Authorization': `Bearer ${authToken}` },
                    body: JSON.stringify({
                        "emission_factor": { "activity_id": "electricity-supply_grid-source_total_supplier_mix", "data_version": "^9" },
                        "parameters": { "energy": parseInt(data), "energy_unit": "kWh" }
                    })
                };
                setData(electricityUrl, electricityOptions, category, 0)
                break;

            default:
                break;
        }
        await onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white py-8 px-12 rounded-lg">
                <h2 className="text-2xl text-center text-bold mb-4">Update for today</h2>
                <form className='text-xl'>
                    {/* <input type="text" hidden={!(category == "vehicle")} onChange={handleVehicleChange} className="text-base" placeholder="Vehicle Type" /><br /> */}
                    <label htmlFor="dropdown" hidden={!(category == "vehicle")}>Vehicle Type : </label>
                    <select className='px-6 py-1 ml-2 mb-3 rounded-lg' id="dropdown" name="dropdown" hidden={!(category == "vehicle")} onChange={handleVehicleChange}>
                        <option className="p-4" value="option1">Small Diesel Car</option>
                        <option className="p-4" value="option2">Large Diesel Car</option>
                        <option className="p-4" value="option3">Small Petrol Car</option>
                        <option className="p-4" value="option4">Large Petrol Car</option>
                        <option className="p-4" value="option5">Small Gas Car</option>
                        <option className="p-4" value="option6">Large Gas Car</option>
                        <option className="p-4" value="option7">Bike</option>
                        {/* <option value="option4">Option 4</option> */}
                    </select><br/>
                    <input type="text" onChange={handleInputChange} className="text-base pl-1 py-1 text-xl border" placeholder="Enter the updated value" /><br />
                </form>
                <div className='text-center'>
                    <button type="submit" onClick={updateValue} className="bg-[#526527] text-white mt-4 py-2 px-4 rounded text-lg">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

