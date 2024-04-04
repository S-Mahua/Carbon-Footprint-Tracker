"use client"
import "../index.css";
import Category from "../categories/Updateqr.js";
import { useEffect, useState } from "react";
import FootprintDiv from "../dashboard/footprintDiv";
import { calculateFootprintPercentage } from '../../components/firebase_operations';
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [calculatedUber, setCalculatedUber] = useState('');
  const [calculatedBlinkit, setCalculatedBlinkit] = useState('');
  const [calculatedBigBasket, setCalculatedBigBasket] = useState('');
  const [calculatedAmazon, setCalculatedAmazon] = useState('');
  const [url, setUrl] = useState('');
  const [statusUrl, setStatusUrl] = useState('');
  const [percentage, setPercentage] = useState(0);
  const { user } = useUser();

  const openModal = async (category) => {
    setSelectedCompany(category);
    await fetchRequestUrl(category);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const setPage = (val) => {
    switch (selectedCompany) {
      case 'uber':
        setCalculatedUber(val);
        break;
      case 'amazon':
        setCalculatedAmazon(val);
        break;
      case 'bigbasket':
        setCalculatedBigBasket(val);
        break;
      case 'blinkit':
        setCalculatedBlinkit(val);
        break;
      default:
        break;
    }
  };

  const fetchRequestUrl = async (company) => {
    fetch("http://localhost:3000/createProofRequest", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': ''
      },
      body: JSON.stringify({
        sessionId: "sessionId",
        addressUser: "addressUser",
        messageUser: "messageUser",
        provider: company
      })
    }).then(async (response) => {
      const data = await response.json();
      setUrl(data[0]);
      setStatusUrl(data[1]);
      console.log(data[1])
    }).catch(async (error) => {
      console.error('Error fetching data:', error);
    });
  };

  useEffect(() => {
    if (user !== undefined) {
      calculateFootprintPercentage(user?.fullName, setPercentage);
    }
  }, []);

  return (
    <div className="bg-[#e8e6d7]">
      <h1 className="text-5xl text-[#526527] font-bold py-10 text-center">Emission Tracking Dashboard</h1>
      <div className="bg-[#b5bf96] rounded-lg p-5 mx-10">
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="flex flex-row">
              <div className="w-1/2 bg-[#3c4627] text-white px-8 py-20 rounded-lg mt-5 mr-5 font-medium text-3xl flex flex-col items-center">
                <button onClick={() => openModal('uber')} className="button">Uber</button>
                {calculatedUber && <div style={{ justifyContent: "center", fontSize: "20px" }}>{calculatedUber} rides</div>}
              </div>
              <div className="w-1/2 bg-white text-black px-8 py-20 rounded-lg mt-5 mr-5 font-medium text-3xl flex flex-col items-center">
                <button onClick={() => openModal('amazon')} className="button">Amazon</button>
                {calculatedAmazon && <div style={{ justifyContent: "center", fontSize: "20px" }}>{calculatedAmazon} orders</div>}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-1/2 bg-white text-black px-8 py-20 rounded-lg mt-5 mr-5 font-medium text-3xl flex flex-col items-center">
                <button onClick={() => openModal('blinkit')} className="button">Blinkit</button>
                {calculatedBlinkit && <div style={{ justifyContent: "center", fontSize: "20px" }}>{calculatedBlinkit} items</div>}
              </div>
              <div className="w-1/2 bg-[#3c4627] text-white px-8 py-20 rounded-lg mt-5 mr-5 font-medium text-3xl flex flex-col items-center">
                <button onClick={() => openModal('bigbasket')} className="button">BigBasket</button>
                {calculatedBigBasket && <div style={{ justifyContent: "center", fontSize: "20px" }}>{calculatedBigBasket} items</div>}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-1/2 bg-[#3c4627] text-white px-8 py-20 rounded-lg mt-5 mr-5 font-medium text-3xl flex flex-col items-center">
                <button onClick={() => openModal('Water')} className="button">Swiggy</button>
              </div>
              <div className="w-1/2 bg-white text-black px-8 py-20 rounded-lg mt-5 mr-5 font-medium text-3xl flex flex-col items-center">
                <button onClick={() => openModal('Waste')} className="button">Alphabot</button>
              </div>
            </div>
          </div>
          <div className="w-1/2 relative">
            <FootprintDiv fillPercentage={percentage} />
            {/* Legends */}
            <div className="absolute bottom-0 right-0 mr-10 mb-5">
            <div className="legend bg-red-500 text-white px-4 py-3 rounded-md mr-3 w-24 text-center">
              Severe
          </div>
            <div className="legend bg-yellow-500 text-white px-4 py-3 rounded-md mr-3 w-24 text-center">
              Average
          </div>
            <div className="legend bg-green-500 text-white px-4 py-3 rounded-md w-24 text-center">
              Good
          </div>
            </div>
          </div>
        </div>
      </div>
      <Category isOpen={isModalOpen} onClose={closeModal} category={selectedCompany} setCalculatedValue={setPage} url={url} statusUrl={statusUrl} />
    </div>
  );
  
  
  }  
  
