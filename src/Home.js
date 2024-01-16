import React, { useState, useEffect, useRef } from "react";
import {
  BsFillBellFill,
  BsPeopleFill,
  BsFillGrid3X3GapFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const intensityRef = useRef(null);
  const likelyhoodRef = useRef(null);
  const relevanceRef = useRef(null);
  // Unused ref, consider removing it
  // const yearRef = useRef(null);

  const [chartData, setChartData] = useState([]);
  const [cachedData, setCachedData] = useState([]);

  useEffect(() => {
    fetch("https://blackserverapi.onrender.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
        setCachedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Set an initial value for cachedData to avoid rendering without data
        if (cachedData.length === 0) {
          setChartData([]);
          setCachedData([]);
        }
      });
  }, [cachedData]);

  

  const totalIntensity = chartData.reduce((total, data) => total + data.intensity, 0);
  const totalLikelihood = chartData.reduce((total, data) => total + data.likelihood, 0);
  const totalRelevance = chartData.reduce((total, data) => total + data.relevance, 0);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h1 className="dash">Dashboard</h1>
      </div>
      <div className="main-card">
        <div id="intensity" ref={intensityRef} className="card">
          <div className="card-inner">
            <h3>INTENSITY</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{totalIntensity}</h1>
        </div>

        <div id="likelyhood" ref={likelyhoodRef} className="card">
          <div className="card-inner">
            <h3>LIKELIHOOD</h3> {/* Corrected spelling */}
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalLikelihood}</h1>
        </div>

        <div id="relevance" ref={relevanceRef} className="card">
          <div className="card-inner">
            <h3>RELEVANCE</h3> {/* Corrected spelling */}
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{totalRelevance}</h1>
        </div>

        {/* Unused ref, consider removing it */}
        {/* <div id="year" ref={yearRef} className="card">
          <div className="card-inner">
            <h3>YEAR</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div> */}

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="intensity" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="relevance" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="intensity" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="relevance" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;
