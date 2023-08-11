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
    const [loading, setLoading] = useState(false)

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (validateEmail(formData.email)) {

            setError('');
            console.log('Email is valid');
            setLoading(true)

            db.collection('contacts').add(formData)
            .then(() => {
                setShowMessage(true)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })

            setFormData(templateObj)

        } else {
            setError('Please enter a valid email address');
            console.log('email not valid')
        }
        
    }


  return (
    <form className={styles.Form} onSubmit={handleFormSubmit}>
        <input type='text' name='name' required placeholder='Name' value={formData.name} onChange={handleFormChange} autoComplete="off"></input>
        <input type='email' name='email' required placeholder='Email' value={formData.email} onChange={handleFormChange} autoComplete="off"></input>
        <input type='text' name='phone' placeholder='Phone Number' value={formData.phone} onChange={handleFormChange} autoComplete="off"></input>
        <textarea name='address' placeholder='Address' value={formData.address} onChange={handleFormChange} autoComplete="off"></textarea>
        <input type='text' name='dob' placeholder='Date of Birth' value={formData.dob} onChange={handleFormChange} autoComplete="off"></input>
        <input type='submit' value={loading ? 'Loading...' : 'Submit'}></input>
        {showMessage && <div>Success! Your information has been saved.</div>}
        {error && <div>{error}</div>}
       
    </form>
  )
}

export default Form
