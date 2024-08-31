import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const CarbonTracker = () => {
  const [transportationData, setTransportationData] = useState([{ distance: '', mode: '' }]);
  const [electricityData, setElectricityData] = useState({ previousUsage: '', todayUsage: '' });
  const [wasteData, setWasteData] = useState({ dryWaste: '', wetWaste: '' });

  const handleTransportationChange = (index, e) => {
    const updatedTransportationData = [...transportationData];
    updatedTransportationData[index][e.target.name] = e.target.value;
    setTransportationData(updatedTransportationData);
  };

  const handleAddTransportation = () => {
    setTransportationData([...transportationData, { distance: '', mode: '' }]);
  };

  const handleElectricityChange = (e) => {
    setElectricityData({
      ...electricityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWasteChange = (e) => {
    setWasteData({
      ...wasteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transportationData, electricityData, wasteData);
  };

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Carbon Emissions (kgCO2e)',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Carbon Tracker</h1>
        <nav className="space-x-6">
          <a href="/" className="mx-4 hover:text-blue-500">Home</a>
          <a href="/community" className="mx-4 hover:text-blue-500">Community</a>
          <a href="/authpage" className="mx-4 hover:text-blue-500">Login</a>
          <a href="/authpage" className="mx-4 hover:text-blue-500">Register</a>
        </nav>
      </header>

      <div className="my-8 text-center">
        <h2 className="text-2xl font-semibold">Total Emissions</h2>
        <div className="flex justify-around mt-4">
          <div className="text-center bg-white p-4 rounded shadow-lg w-1/4">
            <h3 className="text-lg font-semibold">Transportation</h3>
            <p>XXX kgCO2e</p>
          </div>
          <div className="text-center bg-white p-4 rounded shadow-lg w-1/4">
            <h3 className="text-lg font-semibold">Electricity</h3>
            <p>XXX kgCO2e</p>
          </div>
          <div className="text-center bg-white p-4 rounded shadow-lg w-1/4">
            <h3 className="text-lg font-semibold">Waste</h3>
            <p>XXX kgCO2e</p>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Add Today's Consumption Details</h2>
        <form onSubmit={handleSubmit}>
        <div className="space-y-4">
  {transportationData.map((data, index) => (
    <div key={index} className="space-y-4">
      <label className="block text-gray-700 font-bold mb-2">Distance Traveled (km)</label>
      <input
        type="number"
        name="distance"
        value={data.distance}
        onChange={(e) => handleTransportationChange(index, e)}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <label className="block text-gray-700 font-bold mb-2">Mode of Transport</label>
      <select
        name="mode"
        value={data.mode}
        onChange={(e) => handleTransportationChange(index, e)}
        className="w-full px-3 py-2 border rounded-lg"
      >
        <option value="">Choose mode</option>
        <option value="car-petrol">Car (Petrol)</option>
        <option value="car-diesel">Car (Diesel)</option>
        <option value="bike">Bike</option>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="airplane">Airplane</option>
        <option value="electricvehicle">Electric Vehicle</option>
      </select>
    </div>
  ))}
  <div className="relative">
    <button
      type="button"
      onClick={handleAddTransportation}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 "
      style={{ position: "relative" }}
    >
      Add Another Transportation
    </button>
  </div>
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Previous Day's Electricity Usage (kWh)</label>
              <input
                type="number"
                name="previousUsage"
                value={electricityData.previousUsage}
                onChange={handleElectricityChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Today's Electricity Usage (kWh)</label>
              <input
                type="number"
                name="todayUsage"
                value={electricityData.todayUsage}
                onChange={handleElectricityChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Dry Waste (in kg)</label>
              <input
                type="number"
                name="dryWaste"
                value={wasteData.dryWaste}
                onChange={handleWasteChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Wet Waste (in kg)</label>
              <input
                type="number"
                name="wetWaste"
                value={wasteData.wetWaste}
                onChange={handleWasteChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Calculate Emissions</button>
        </form>
      </section>

      <div className="my-8 text-center">
        <h2 className="text-2xl font-semibold">Category Wise Emissions</h2>
        <div className="bg-white p-4 rounded shadow-lg">
          <Line data={chartData} />
        </div>
      </div>

      <div className="my-8 text-center">
        <h2 className="text-2xl font-semibold">Tips to Reduce Emissions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow-lg">
            <p><strong>Tip 1:</strong> Use public transport or carpool whenever possible.</p>
          </div>
          <div className="bg-white p-4 rounded shadow-lg">
            <p><strong>Tip 2:</strong> Turn off lights and appliances when not in use.</p>
          </div>
          <div className="bg-white p-4 rounded shadow-lg">
            <p><strong>Tip 3:</strong> Reduce waste by recycling and composting organic materials.</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Weather and Air Quality Monitoring App</p>
      </footer>
    </div>
  );
};

export default CarbonTracker;
