import { api } from "./API";

/* import axios from "axios"; */

// Function to fetch Contacts data from the server
const fetchContacts = async () => {
  try {
    const response = await api.get();
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching contacts: ", error);
    throw new Error("Failed to fetch contacts");
  }
};

export const userClientServices = {
  fetchContacts,
};
