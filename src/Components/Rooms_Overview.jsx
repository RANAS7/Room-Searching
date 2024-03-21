import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios

const Rooms_Overview = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5713/getRooms") // Update the URL to match your server route
      .then((response) => {
        setRooms(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="room-overview">
      <div className="room-container">
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <img
              alt={room.name} // Use the room name as the alt text
              src={room.imageUrl} // Use the room image URL from your data
              className="room-image"
            />
            <div className="room-info">
              <h2 className="room-name">{room.title}</h2>
              <div className="room-description">{room.description}</div>
              <div className="room-options">
                {/* Include room-specific options here */}
              </div>
              <div className="room-price">
                <span className="price-amount">{room.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rooms_Overview;
