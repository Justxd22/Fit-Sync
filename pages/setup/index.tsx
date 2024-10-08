import { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import Logo from "@/app/assets/Images/Logo.png";
import Image from "next/image";
import "../../app/globals.css";
import "@/app/assets/styles/login.css";
import Link from "next/link";
import { getShipBySessionId } from "@/app/models/Memberships";
import { House, LayoutDashboard, Bolt, Trash, Pause } from "lucide-react";
import "@/app/assets/styles/login.css";


const TrainingScheduleForm: React.FC = () => {
  const [formData, setFormData] = useState<{ training_days: number[] }>({
    training_days: [],
  });

  // Handles checkbox changes for training and rest days
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "training_days"
  ) => {
    const { value, checked } = e.target;
    const day = parseInt(value);

    setFormData((prevState) => {
      const daysArray = prevState[type] || [];
      const updatedDays = checked
        ? [...daysArray, day]
        : daysArray.filter((d) => d !== day);
      return {
        ...prevState,
        [type]: updatedDays,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the number of selected days is between 3 and 5
    if (
      formData.training_days.length < 3 ||
      formData.training_days.length > 5
    ) {
      alert("Please select between 3 and 5 training days.");
      return;
    }

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Successful:", data);
        window.location.href = "/";
      } else {
        console.error("Failed:", data.err);
        alert(`Failed: ${data.err}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="login-wrapper" style={{ color: "white"}}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-heading">Setup</h1>

          <div className="space-y-4">
            <label className="login-input-box">
              Select your Training Days (3 at least):
            </label>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <label
                  key={day}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={day}
                    checked={formData.training_days.includes(day)}
                    onChange={(e) => handleCheckboxChange(e, "training_days")}
                    disabled={
                      !formData.training_days.includes(day) &&
                      formData.training_days.length >= 5
                    }
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="mt-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <br></br>
          <br></br>
          <button
            type="submit"
            className={`login-submit-btn w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              formData.training_days.length < 3
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={formData.training_days.length < 3}
          >
            Submit
          </button>
        </form>
      </div>
  );
};

export default TrainingScheduleForm;
