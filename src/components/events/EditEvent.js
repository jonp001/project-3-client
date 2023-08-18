import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API_URL= process.env.REACT_APP_URL || "http://localhost:5005";

export default function EditEvent() {
  const { eventId } = useParams();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the event data on component mount
    axios
      .get(`${API_URL}/events/${eventId}`)
      .then((response) => {
        setFormData(response.data.event);
        console.log("Fetched event data:", response.data.event);
      })
      .catch((err) => {
        console.error("Error fetching event data:", err);
      });
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
        const updatedEventData = {
            ...formData,
            location: formData.location._id
          };
      
      await axios.put(
        `${API_URL}events/edit-event/${eventId}`,
        updatedEventData,
        config
      );
      navigate(`/editLocation/${formData.location._id}`);
    } catch (error) {
      console.error(
        "Error updating the event:",
        error.response?.data || error.message
      );
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Level:
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Event Type:
        <label>
          <input
            type="radio"
            name="eventType"
            value="race"
            checked={formData.eventType === "race"}
            onChange={handleChange}
          />{" "}
          Race
        </label>
        <label>
          <input
            type="radio"
            name="eventType"
            value="group ride"
            checked={formData.eventType === "group ride"}
            onChange={handleChange}
          />{" "}
          Group Ride
        </label>
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
}
