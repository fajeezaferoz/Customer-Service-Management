import axios from "axios";
import { toast } from "react-toastify";

export const updateCustomerDetailsFromAPI = async (id, customerData) => {
  const sessionObject = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionObject?.token
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    window.location.href = "/login";
    throw new Error("User is not authenticated. Please log in.");
  }
  if(sessionObject.user.userName !== id){
    toast.error("Unauthorized to update customer details.");
    return;
  }
  
  try {
    const response = await axios.put(
      `https://localhost:9000/api/customers/${id}`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to update employee details. Please try again.");
    console.error(error);
    throw error;
  }
};
