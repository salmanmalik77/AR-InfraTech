import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
<<<<<<< Updated upstream
=======
import axios from "axios";
>>>>>>> Stashed changes

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email first
    if (!validateEmail(formData.email)) {
      setNotification({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    // Prepare the form data to send
    const emailData = {
      name: formData.name,
      email: formData.email,
      subject: "Contact Form Submission", // You can customize this
      message: formData.message,
    };

    try {
      const response = await axios.post(
        "https://localhost:5001/api/Email/send",
        emailData
      );
      // Display success notification
      setNotification({
        type: "success",
        message: response.data.message,
      });

      // Clear the form after successful submission

      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });

      // Remove the notification after 3 seconds
      setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 3000); // 3 seconds delay before clearing the notification
    } catch (error) {
      // Display error notification

      setNotification(
        {
          type: "error",
          message: "Failed to send email. Please try again.",
        },
        3000
      );

      // Remove the error notification after 3 seconds
      setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 3000);
    }
  };
  return (
    <div id="contact" className="bg-[#E5E5E5]">
      <div
        className="lg:w-[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col 
                    justify-between items-start gap-[50px]"
      >
        {/* Left Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[60%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.h1
            variants={slideUpVariants}
            className="text-blue-500 text-2xl"
          >
            Contact Us
          </motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-[#1E293B] uppercase text-[35px] font-bold"
          >
            Reach Us for Any Query
          </motion.h1>
          <div className="w-[120px] h-[6px] bg-[#FF4F5A]"></div>
          <p className="text-3xl italic text-gray-700 mt-[40px]">
            We are here to assist you with any inquiries or project-related questions. 
            Whether you're looking for consultation, want to start a project, or need 
            support, feel free to get in touch with us. Our team is ready to provide 
            expert advice and personalized solutions.
          </p>
        </motion.div>

        {/* Right Content - Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={zoomInVariants}
            className="flex flex-col justify-center items-start gap-4 w-full"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
<<<<<<< Updated upstream
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full"
=======
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full "
>>>>>>> Stashed changes
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
<<<<<<< Updated upstream
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full"
=======
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full "
>>>>>>> Stashed changes
            />
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
<<<<<<< Updated upstream
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full"
            />
            <textarea
=======
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full "
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
>>>>>>> Stashed changes
              placeholder="Enter Your Message"
              rows="4"
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full"
            />
            <motion.button
              variants={zoomInVariants}
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-[#FF4F5A] hover:text-white px-10 py-4 
                       text-white font-bold rounded-lg w-full"
            >
              Submit
            </motion.button>
          </motion.div>

          {/* Display Notification */}
          {notification.message && (
            <div
              className={`mt-4 p-4 text-white rounded-lg ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notification.message}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
