import React, { useState } from 'react';

const PatientReleaseForm = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <div
        className='flex flex-col items-center justify-center border rounded-2xl p-5 cursor-pointer hover:bg-gray-100 shadow-lg'
        onClick={handleClick}
      >
        <div className='h-40 w-3/4 text-4xl border border-black rounded-lg mb-2 flex items-center justify-center'>
          <img src={releaselogo} alt='' className='h-20 w-20' />
        </div>
        <h3 className='text-xl font-semibold'>Release Patient</h3>
      </div>

      {showForm && (
        <form>
          {/* Add your form elements and logic here */}
          <h2>Release Patient Form</h2>
          {/* Form fields, buttons, etc. */}
        </form>
      )}
    </div>
  );
};

export default PatientReleaseForm;
