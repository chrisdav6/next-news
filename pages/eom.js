import React from 'react';
import Toolbar from '../components/Toolbar';
import EOMstyles from '../styles/EOM.module.css';

export const getServerSideProps = async context => {
  const apiRes = await fetch('http://localhost:3000/api/eom');
  const data = await apiRes.json();
  const employee = data[0].employeeOfTheMonth;

  return {
    props: {
      employee
    }
  };
};

const EOM = ({ employee }) => {
  console.log(employee);
  return (
    <div className='page-container'>
      <Toolbar />
      <div className={EOMstyles.main}>
        <h1>Employee of the Month!</h1>

        <div className={EOMstyles.eom}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          <img src={employee.image} alt='Employye of the Month!' />
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EOM;
