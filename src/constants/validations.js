import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  bio: yup
    .string()
    .max(200, ({max}) => `Bio can be only ${max} characters`)
    .required('Bio is Required*'),
  contact: yup
    .string()
    .min(10, ({min}) => `Contact number must be ${min} characters`)
    .max(10, ({max}) => `Contact number can be only ${max} characters`)
    .required('Contact is Required*')
    .matches(/^[0-9]+$/, 'Must be only digits'),
  dateofBirth: yup.string().required('Date of Birth is Required*'),
  gender: yup.string().required('Gender is Required*'),
  bloodGroup: yup.string().required('Blood Group is Required*'),
  country: yup.string().required('Country is Required*'),
  address: yup
    .string()
    .max(100, ({max}) => `Address can be only ${max} characters`)
    .required('Address is Required*'),
  state: yup.string().required('State is Required*'),
});

export const appointmentValidationSchema = yup.object().shape({
  doctorName: yup.string().required('Doctor name is required'),
  notes: yup
    .string()
    .max(100, ({max}) => `Notes can be only ${max} characters`)
    .required('Notes is Required*'),
  date: yup.string().required('Date is Required*'),
  time: yup.string().required('Time is Required*'),
});

export const prescriptionValidationSchema = yup.object().shape({
  doctorName: yup.string().required('Doctor Name is Required*'),
  specialization: yup.string().required('Specialization is Required*'),
  contact: yup
    .string()
    .min(10, ({min}) => `Contact number must be ${min} characters`)
    .max(10, ({max}) => `Contact number can be only ${max} characters`)
    .required('Contact is Required*')
    .matches(/^[0-9]+$/, 'Must be only digits'),
  location: yup.string().required('Location is Required*'),
  image: yup.string().required('Image is Required*'),
});

export const updateAppointmentSchema = yup.object().shape({
  notes: yup
    .string()
    .max(100, ({max}) => `Notes can be only ${max} characters`)
    .required('Notes is Required*'),
  date1: yup.string().required('Date is Required*'),
  time: yup.string().required('Time is Required*'),
});

export const addMedicineSchema = yup.object().shape({
  medicineName: yup.string().required('Medicine Name is Required*'),
  description: yup
    .string()
    .min(3, ({min}) => `Description must be more than ${min} characters*`)
    .max(255, ({max}) => `Description can be only of ${max} characters*`)
    .required('Description is Required*'),
  dosageQuantity: yup
    .string()
    .matches(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/, 'Invalid Input')
    .required('Dosage Quantity is Required*'),

  dosagePower: yup
    .string()
    .required('Dosage Power is Required*')
    .matches(/^[0-9]+$/, 'Invalid Input')
    .test('no-leading-zero', 'Invalid Input', (value, context) => {
      return context.originalValue && !context.originalValue.startsWith('0');
    }),
  stocks: yup
    .string()
    .required('Stocks are Required*')
    .matches(/^[0-9]+$/, 'Invalid Input')
    .test('no-leading-zero', 'Invalid Input', (value, context) => {
      return context.originalValue && !context.originalValue.startsWith('0');
    }),
  notify: yup
    .string()
    .matches(/^(?!\s)+([0-9])+$/, 'Invalid Input')
    // .test('Is positive?', 'Invalid ENTRY', value => value > 0)
    .nullable(),
});

export const updateNotesSchema = yup.object().shape({
  review: yup
    .string()
    .min(10, ({min}) => `Review must be more than ${min} characters*`)
    .max(120, ({max}) => `Review can be only of ${max} characters*`)
    .nullable(),
});
