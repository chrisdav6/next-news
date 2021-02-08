import React from 'react';

export const getServerSideProps = async context => {
  const apiRes = await fetch('http://localhost:8000/employeeOfTheMonth');
  const employee = await apiRes.json();

  return {
    props: {
      employee
    }
  };
};

const EOM = ({ employee }) => {
  return (
    <div className='page-container'>
      <div>
        <h1>Employee of the Month!</h1>
        <p>{employee.name}</p>
      </div>
    </div>
  );
};

export default EOM;
