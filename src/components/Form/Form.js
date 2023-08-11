import React, { useState } from 'react'
import styles from './Form.module.css';


const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: ""
    })

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

  return (
    <form>
        <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleFormChange} autoComplete="off"></input>
        <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleFormChange} autoComplete="off"></input>
        <input type='text' name='phone' placeholder='Phone Number' value={formData.phone} onChange={handleFormChange} autoComplete="off"></input>
        <textarea name='address' placeholder='Address' value={formData.address} onChange={handleFormChange} autoComplete="off"></textarea>
        <input type='text' name='dob' placeholder='Date of Birth' value={formData.dob} onChange={handleFormChange} autoComplete="off"></input>
        <input type='submit' value='Submit'></input>
      
    </form>
  )
}

export default Form
