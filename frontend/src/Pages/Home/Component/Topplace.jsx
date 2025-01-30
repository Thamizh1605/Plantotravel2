import React from "react";

const TopPlaces = () => {
    const places = [
        {
          name: "Eiffel Tower",
          location: "Paris, France",
          description: "An iconic landmark offering stunning views of Paris.",
          discountOffer: "20% off on tickets this season!",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
        },
        {
          name: "Great Wall of China",
          location: "Beijing, China",
          description: "A historic fortification stretching thousands of miles.",
          discountOffer: "15% off on guided tours.",
          image: "https://tse1.explicit.bing.net/th/id/OIP.dVstE3IyUxAGXmCsAen1QAHaE9?rs=1&pid=ImgDetMain",
        },
        {
          name: "Taj Mahal",
          location: "Agra, India",
          description: "A beautiful marble mausoleum and UNESCO World Heritage Site.",
          discountOffer: "10% off on sunrise tours.",
          image: "https://i1.wp.com/worldupclose.in/wp-content/uploads/2020/03/taj.jpg",
        },
      ];
  return (
    <div className="p-6 bg-gray-100">
      {places.map((place, index) => (
        <div
          key={index}
          className={`flex ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          } items-center mb-6 bg-white rounded-lg shadow-lg overflow-hidden`}
        >
          <div className="w-1/3">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-[300px] object-cover"
            />
          </div>
          <div className="w-2/3 p-4">
            <h2 className="text-xl font-bold text-gray-800">{place.name}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {place.location}
            </p>
            <p className="text-gray-600 mb-4">{place.description}</p>
            <p className="text-green-600 font-semibold">
              <strong>Discount Offer:</strong> {place.discountOffer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPlaces;
