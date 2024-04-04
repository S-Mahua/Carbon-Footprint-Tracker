import React from 'react';
import "../index.css"
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./pieChart.js";
import BarGraph from "./barGraph.js";

Chart.register(CategoryScale);
Chart.defaults.font.size = 20;

export default function UserStats() {
    return(
        <div>
            {/* <div className='p-4 place-content-center'>
                <PieChart />
            </div> */}
            <div className=' p-4'>
                <BarGraph />
            </div>
        </div>
    );
}