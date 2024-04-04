"use client";
import React , {useEffect, useState}from 'react';
import "../index.css"
import UserStats from "./userStats.js";
import { useUser } from '@clerk/nextjs';
import {calculateFootprintPercentage,inputCarbonData} from '../../components/firebase_operations'
// import svg file
import ProfileSvg from "../../../public/man-coloured.svg"
import PieChart from './pieChart';
export default function UserProfile() {
    const {user} = useUser()
    var check = true;
    var [percentage, setPercentage] = useState(0);
    percentage = Number(percentage);
    useEffect(()=>{
     if(user != undefined) {
        if(check) {
            inputCarbonData("travel",0,user?.fullName)
            inputCarbonData("food",0,user?.fullName,)
            inputCarbonData("vehicle",0,user?.fullName,)
            inputCarbonData("electricity",0,user?.fullName,)
            check = false;
          }
        calculateFootprintPercentage(user?.fullName,setPercentage);
        console.log(user?.primaryEmailAddress.emailAddress)
     }
    },[])
    return (
        <div className="bg-[#e8e6d7] text-white">
            <div>
            <h1 className="text-5xl font-bold py-10 text-[#526527] text-center">User Profile</h1>
            {/* two sections of the page - left side having details name, city, etc. and right side having profile picture */}

            <div className="flex bg-[#b5bf96] mx-10 rounded-lg">

                <div className="w-5/12 p-8 my-5 ml-40 rounded-lg text-justify bg-[#3c4627]">
                    <h1 className="text-4xl font-bold py-4">{user?.fullName}</h1>
                    {/* create a table that should span the entire flexbox */}
                    
                    <table className="w-full table-auto text-xl px-3 leading-loose">
                        <tbody>
                            <tr>
                                <td className="text-left">Location: </td>
                                <td className="text-right">Hyderabad, India</td>
                            </tr>
                            <tr>
                                <td className="text-left">Email: </td>
                                <td className="text-right">{user?.primaryEmailAddress.emailAddress}</td>
                            </tr>
                            <tr>
                                <td className="text-left">Joined: </td>
                                <td className="text-right">{user?.createdAt.toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td className="text-left">Total Footprint: </td>
                                <td className="text-right">{Number(percentage)} %</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="w-1/2 p-4 mr-20 ml-10 rounded-lg align-middle">
                    {/* <img src={ProfileSvg} alt="Profile Picture" className="rounded-full h-64 w-64 mx-auto" style={{ fill: 'white' }} /> */}
                    <PieChart />
                </div>
            </div>
            <div>
                <UserStats />
            </div>
            </div>
        </div>
    );
}