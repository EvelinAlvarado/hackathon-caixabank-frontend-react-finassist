import { createContext, useEffect, useState } from "react";
import { userClientServices } from "../services/ContactsService";

export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contactsList, setContactsList] = useState([]);

  const fetchContacts = async () => {
    try {
      const data = await userClientServices.fetchContacts();
      console.log("Fetching contacts in context: ", data);
      setContactsList(data);
    } catch (error) {
      console.log("Failed to fetch contacts in context: ", error);
      throw new Error("Failed to fetch contacts in context");
    }
  };

  // useEffect hook to fetch categories when the component mounts.
  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <ContactsContext.Provider value={{ contactsList }}>
      {children}
    </ContactsContext.Provider>
  );
};
