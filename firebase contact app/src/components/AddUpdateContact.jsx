import React from 'react'
import Modal from './Modal'
import { Field, Form, Formik } from 'formik'
import { database } from '../config/firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValid = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().required("Email is Required")
})

const AddUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

  const addContact = async (contact) => {
    try {
      const contactsRef = collection(database, "contact");
      await addDoc(contactsRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    }
    catch (error) {
      console.log(error)
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactsRef = doc(database, "contact", id);
      await updateDoc(contactsRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    }
    catch (error) {
      console.log(error)
    }
  };
  return (
    <>
     
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <Formik
          validationSchema={contactSchemaValid }
          initialValues={
            isUpdate
              ?
              {
                name:  contact.name,
                email: contact.email,
              }
              : {
                name: "",
                email: "",
              }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ?  updateContact(values, contact.id) : addContact(values);

          }
          }
        >

          <Form className='flex flex-col gap-4' >
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Name</label>
              <Field name="name" className='border h-10'  />
            </div>

            <div className='flex flex-col gap-2 '>
              <label htmlFor="email">Email</label>
              <Field  name="email" className='border h-10'/>
            </div>
            <button type='submit' className="self-end border bg-orange gap-1 px-3 py-1.5 ">
            {isUpdate ? "Update" : "Add"} Contact

            </button>

          </Form>
        </Formik>
      </Modal>
    </>
  )
}

export default AddUpdateContact