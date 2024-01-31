import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { IoMdSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, onSnapshot } from "firebase/firestore";
// import { FaTrash } from "react-icons/fa";
// import { TbEditCircle } from "react-icons/tb";
// import { FaUserAlt } from "react-icons/fa";
import ContactCard from "./components/ContactCard";
import { getDocs } from "firebase/firestore";
import { database } from "./config/firebase";
import AddUpdateContact from "./components/AddUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(database, "contact");
       
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
  
          setContacts(contactLists);
          return contactLists ;
        });
      } catch (error) {
          console.log(error);
        }
      };
      getContacts();
    }, []);
        
  const filterContacts = (e) => {
    const value = e.target.value;
    
    const contactsRef = collection(database, "contact");
       
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });

      const filteredContacts = contactLists.filter((contact) => 
  contact.name.toLowerCase().includes(value.toLowerCase())
)

      setContacts(filteredContacts);
      
      return filteredContacts ;
    });
  }
       
  return (
    <>

      <div className="mx-auto max-w-[370px] px-4">
        <NavBar />
        <div className="flex gap-2">
          <div className="relative gap-3 flex flex-grow items-center">
            <IoMdSearch className=" absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className=" flex-grow bg-transparent border border-white rounded-md h-10 text-white pl-10"
            />
            <FaCirclePlus onClick={onOpen} className="text-4xl text-white  cursor-pointer" />
          </div>
        </div>
        <div className="mt-4">
          {contacts.map((contact) => (

            <ContactCard key={contact.id} contact={contact} />
          ))}

        </div>
      </div>
      <AddUpdateContact
        // contact={contacts}
        // isUpdate
        onClose={onClose}
        isOpen={isOpen}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={3000} 
        hideProgressBar={true}
        closeOnClick
      />

    </>

  );
};


export default App;
