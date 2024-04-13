import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const { id } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    const { firstName, lastName, email } = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmail(email);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email };

            if (id) {
                updateEmployee(id, employee)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                createEmployee(employee)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First Name is required';
            valid = false;
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-mid-3'>
                    <h2 className='text-center'>{id ? 'UPDATE EMPLOYEE' : 'ADD EMPLOYEE'}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveOrUpdateEmployee}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleFirstName}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastName}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email Id'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleEmail}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button type='submit' className='btn btn-success'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
