import React, { useState } from 'react'
import { db } from './../../api_config/firebase'
import styles from './Form.module.css';


const Form = () => {

    const templateObj = {
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: ""
    }

    const [formData, setFormData] = useState(templateObj)

    const [showMessage, setShowMessage] = useState(false)
    const [error, setError] = useState('')

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        db.collection('contacts').add(formData)
        .then(() => (setShowMessage(true)))
        .catch((err) => (setError(err.message)))

        setFormData(templateObj)
    }


  return (
    <form className={styles.Form} onSubmit={handleFormSubmit}>
        <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleFormChange} autoComplete="off"></input>
        <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleFormChange} autoComplete="off"></input>
        <input type='text' name='phone' placeholder='Phone Number' value={formData.phone} onChange={handleFormChange} autoComplete="off"></input>
        <textarea name='address' placeholder='Address' value={formData.address} onChange={handleFormChange} autoComplete="off"></textarea>
        <input type='text' name='dob' placeholder='Date of Birth' value={formData.dob} onChange={handleFormChange} autoComplete="off"></input>
        <input type='submit' value='Submit'></input>
        {showMessage && <div>SUCCESS</div>}
        {error && <div>{error}</div>}
       
    </form>
  )
}

export default Form
