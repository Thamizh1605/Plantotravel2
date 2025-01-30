import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const First = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState(null); // Store result here
  const [loading, setLoading] = useState(false); // Show loading state

  const handleFindClick = async () => {
    if (!start || !destination || !budget) {
      alert('Please fill in all fields!');
      return;
    }

    setLoading(true); // Show loading spinner

    try {
      const response = await fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start, destination, budget }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data); // Set the result from the API
      } else {
        setResult({ message: 'Failed to fetch data from the backend' });
      }
    } catch (error) {
      setResult({ message: 'An error occurred, please try again later.' });
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div>
      <div className="h-[400px] bg-cover bg-center w-full flex bg-linear-65 from-purple-500 to-pink-500 relative">
        <div className="w-[70%] p-4 h-[100%] py-[100px] flex-col">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Starting"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="bg-white p-2 w-full rounded-md shadow-sm"
            />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-white p-2 w-full rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-white p-2 w-full rounded-md shadow-sm"
            />
          </div>
          <div>
            <button
              onClick={handleFindClick}
              className="bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 w-[100%]"
            >
              Find
            </button>
          </div>
          <Link to='/'>
            <button className="absolute top-[20px] right-10 bg-gray-700 cursor-pointer text-white font-bold p-2 rounded-2xl">
              Return to Home
            </button>
          </Link>
        </div>
        <div className="w-[30%] h-[400px] p-4 flex flex-col justify-center items-center">
          <p className="font-bold text-4xl text-center">Don't know</p>
          <p className="font-bold text-4xl text-center">where to go?</p>
          <Link to='/aichatbot'>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">
            Chat to AI
          </button>
          </Link>

        </div>
      </div>

      {/* Result Section */}
      <div className="mt-6">
        {loading && <p>Loading...</p>}


        {result  && (
          <div className="mt-4 p-6 bg-gradient-to-b from-blue-400 to-teal-300 shadow-lg rounded-2xl text-white">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold">
                Your trip to <span className="underline decoration-wavy">{destination}</span> is feasible!
              </h2>

              {/* Total Cost Section */}
              <div className="bg-white text-gray-800 rounded-lg shadow p-4">
                <p className="text-lg font-semibold">Total Cost: </p>
                <p className="text-2xl font-bold">{result.total_cost}</p>
              </div>

              {/* Tourist Spots Section */}
              <div className="w-full bg-white text-gray-800 rounded-lg shadow p-4">
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">
                  Must-Visit Tourist Spots
                </h3>
                <ul className="space-y-3">
                  {result.tourist_spots.map((spot, index) => (
                    <li
                      key={index}
                      className="flex flex-col bg-gradient-to-r from-teal-200 to-blue-200 p-4 rounded-lg shadow"
                    >
                      <span className="font-semibold text-lg">{spot.name}</span>
                      <p className="text-sm text-gray-700">{spot.description}</p>
                      <span className="text-sm font-medium text-gray-800">
                        Entry Fee: {spot.entry_fee}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default First;
