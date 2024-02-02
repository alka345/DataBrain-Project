import React, { useState } from 'react';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
    },
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
    paymentDetails: {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e, step) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        [name]: value,
      },
    }));
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Perform form submission logic here
      // For now, just console log the form data
      console.log('Form submitted:', formData);
    }
  };

  const validateStep = () => {
    const errors = {};
    const currentStepData = formData[getStepName(currentStep)];

    for (const key in currentStepData) {
      if (!currentStepData[key]) {
        errors[key] = (
            <span className="error text-red-500">This field is required!</span>
            );

      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const getStepName = (step) => {
    switch (step) {
      case 1:
        return 'personalDetails';
      case 2:
        return 'address';
      case 3:
        return 'paymentDetails';
      default:
        return '';
    }
  };

  return (
    <div>

      <form className='max-w-sm mx-auto border ' onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div>
            <h2 className='font-bold mt-10'>Step 1: Personal Details</h2>
            <label className='block mb-2 mt-5 ml-8 mr-8 text-sm font-medium text-gray-900'>
              First Name:
              <input 
                type="text"
                name="firstName"
                value={formData.personalDetails.firstName}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              />
              {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
            </label>
            <label className='block mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.personalDetails.lastName}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              />
              {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
            </label>
            <label className='block mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'>
              Email:
              <input
                type="email"
                name="email"
                value={formData.personalDetails.email}
                onChange={(e) => handleChange(e, 'personalDetails')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              />
              {formErrors.email && <span className="error">{formErrors.email}</span>}
            </label>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className='mt-10 font-bold'>Step 2: Address</h2>
            <label className='block mt-5 mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'>
              Street:
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleChange(e, 'address')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

              />
              {formErrors.street && <span className="error">{formErrors.street}</span>}
            </label>
            <label className='block mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'>
              City:
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange(e, 'address')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

              />
              {formErrors.city && <span className="error">{formErrors.city}</span>}
            </label>
            <label className='block mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'> 
              Zip Code:
              <input
                type="text"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => handleChange(e, 'address')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

              />
              {formErrors.zipCode && <span className="error">{formErrors.zipCode}</span>}
            </label>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className='mt-10 font-bold'>Step 3: Payment Details</h2>
            <label className='block mt-5 mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={formData.paymentDetails.cardNumber}
                onChange={(e) => handleChange(e, 'paymentDetails')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

              />
              {formErrors.cardNumber && <span className="error">{formErrors.cardNumber}</span>}
            </label>
            <label className='block mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                value={formData.paymentDetails.expirationDate}
                onChange={(e) => handleChange(e, 'paymentDetails')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

              />
              {formErrors.expirationDate && <span className="error">{formErrors.expirationDate}</span>}
            </label>
            <label className='block mb-2 ml-8 mr-8 text-sm font-medium text-gray-900'>
              CVV:
              <input
                type="text"
                name="cvv"
                value={formData.paymentDetails.cvv}
                onChange={(e) => handleChange(e, 'paymentDetails')}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

              />
              {formErrors.cvv && <span className="error">{formErrors.cvv}</span>}
            </label>
          </div>
        )}

        <div>
          {currentStep > 1 && <button onClick={handlePrev}
             className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >Previous</button>}
          {currentStep < 3 ? (
            <button 
            onClick={handleNext}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 mt-3 ml-8 text-center ' 
            type="button"
             > Next
            </button>
          ) : (
            <button 
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-8 mb-5 text-center '
            type="submit"
            >Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
