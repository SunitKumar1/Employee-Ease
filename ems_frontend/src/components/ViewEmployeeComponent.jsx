import React, { useEffect, useState } from 'react';
import { getEmployee } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

const ViewEmployeeComponent = () => {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setEmployee(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-mid-3'>
                    <h2 className='text-center'>VIEW EMPLOYEE</h2>
                    <div className='card-body'>
                        {employee ? (
                            <div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>First Name:</label>
                                    <div>{employee.firstName}</div>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name:</label>
                                    <div>{employee.lastName}</div>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email:</label>
                                    <div>{employee.email}</div>
                                </div>
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeComponent;
