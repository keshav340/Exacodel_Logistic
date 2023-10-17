'use client'

import { ErrorMessage, Field } from "formik";

interface TextFieldProps {
    id: string;
    title: string;
    type: string;
}

const TextField: React.FC<TextFieldProps> = ({id, title, type}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-600"
      >
        {title}
      </label>
      <Field
        type={type}
        id={id}
        name={id}
        className="block px-4 w-full rounded-md border-0 py-1.5 focus:outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      />
      <ErrorMessage name={id} component="div" className='text-xs text-rose-600'/>
    </div>
  );
};

export default TextField;
