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
        <input type='text' name='name' className={styles.field} required placeholder='Name' value={formData.name} onChange={handleFormChange} autoComplete="off"></input>
        <input type='email' name='email' className={styles.field} required placeholder='Email' value={formData.email} onChange={handleFormChange} autoComplete="off"></input>
        <input type='text' name='phone' className={styles.field} placeholder='Phone Number' value={formData.phone} onChange={handleFormChange} autoComplete="off"></input>
        <textarea name='address' className={styles.text} placeholder='Address' value={formData.address} onChange={handleFormChange} autoComplete="off"></textarea>
        <input type='text' className={styles.field} name='dob' placeholder='Date of Birth' value={formData.dob} onChange={handleFormChange} autoComplete="off"></input>
        <input type='submit' className={styles.btn} value={loading ? 'Loading...' : 'Submit'}></input>
        {
            showMessage && <div className={styles.overlay}>
            <h1>Success! Your information has been saved.</h1>
            <div className={styles.closeMessage} onClick={() => (setShowMessage(false))}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 1024 1024"><path fill="white" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg>
                        </div>
            </div>
        }
        {
            error && <div className={styles.error}>
                        <h1 className={styles.errorMessage}>{error}</h1>
                        
                    </div>
        }
       
    </form>
  )
}

export default Form
