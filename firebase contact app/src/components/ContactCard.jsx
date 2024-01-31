import React, {  } from "react";
import { TbEditCircle } from "react-icons/tb"
import {FaTrash, FaUserAlt } from "react-icons/fa"
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../config/firebase";
import AddUpdateContact from "./AddUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const {isOpen, onClose,onOpen} = useDisclouse();
   
   
  const delContact = async(id) => {
    try {
      await deleteDoc(doc(database, "contact", id));
      toast.success("Contact deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      key={contact.id}
      className="bg-yellow mt-3 p-2 items-center justify-between rounded-lg flex"
    >
      <div className="flex gap-5">
        <FaUserAlt className="text-orange text-4xl" />
        <div className="">
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>
        <div className="flex text-3xl">
         
          <TbEditCircle
            onClick={onOpen}
            className="cursor-pointer"
          />
          <FaTrash
            onClick={() => delContact(contact.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>
      <AddUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default ContactCard;
