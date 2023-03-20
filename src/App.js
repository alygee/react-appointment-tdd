import React, { useState, useCallback } from 'react';
import {
  Link,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';
import { CustomerForm } from './CustomerForm';
import { AppointmentFormRoute } from './AppointmentFormRoute';
import { CustomerSearchRoute } from './CustomerSearchRoute';

const blankCustomer = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
};

export const MainScreen = () => (
  <>
    <menu>
      <li>
        <Link to="/addCustomer" role="button">
          Add customer and appointment
        </Link>
      </li>
      <li>
        <Link to="/searchCustomers" role="button">
          Search customers
        </Link>
      </li>
    </menu>
    <AppointmentsDayViewLoader />
  </>
);

export const App = () => {
  const navigate = useNavigate();

  const transitionToAddAppointment = (customer) =>
    navigate(`/addAppointment?customer=${customer.id}`);

  const transitionToDayView = () => navigate('/');

  const searchActions = (customer) => (
    <Link
      role="button"
      to={`/addAppointment?customer=${customer.id}`}
      className="px-4 py-2 text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
    >
      Create appointment
    </Link>
  );

  return (
    <Routes>
      <Route
        path="/addCustomer"
        element={
          <CustomerForm
            original={blankCustomer}
            onSave={transitionToAddAppointment}
          />
        }
      />
      <Route
        path="/addAppointment"
        element={
          <AppointmentFormRoute onSave={transitionToDayView} />
        }
      />
      <Route
        path="/searchCustomers"
        element={
          <CustomerSearchRoute
            renderCustomerActions={searchActions}
          />
        }
      />
      <Route path='/' element={<MainScreen />} />
    </Routes>
  );
};
