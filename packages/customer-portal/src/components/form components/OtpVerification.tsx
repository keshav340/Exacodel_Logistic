import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "@/features/user/user-slice";
import { updateFormName } from "@/features/select-form/selectForm-slice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";

const SEND_OTP_MUTATION = gql`
    mutation SendOTP($email: String!) {
      sendOTP(email: $email)
    }
  `;

const INITIAL_REGISTRATION_MUTATION = gql`
    mutation InitialRegistration($userInput: SelectUserTypeAndSubtypeInput!, $emailInput: EmailInput!) {
      initialRegistration(userInput: $userInput, emailInput: $emailInput) {
        userType
        customerSubType
        vendorSubType
        overseasAgentSubType
        email
        otp
        id
      }
    }
  `;

function OtpVerification() {
  const email = useSelector((state) => state.user.email);
  // const { identification, userType } = useSelector((state) => state.starterSlice);
  const [sendOtpClicked, setSendOtpClicked] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  const dispatch = useDispatch();
  const inputRefs = useRef(Array(4).fill(0).map(() => React.createRef()));

  const [Email, setEmail] = useState('');
  const [Otp, setOtp] = useState('');


  const [sendOTPMutation] = useMutation(SEND_OTP_MUTATION);
  const [initialRegistration] = useMutation(
    INITIAL_REGISTRATION_MUTATION
  );  
  // Log the GraphQL query
  console.log("GraphQL Query:", INITIAL_REGISTRATION_MUTATION?.loc?.source?.body);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (value && index < 3) {
      inputRefs.current[index + 1].current.focus();
    }
  };


  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const logEmail = (values) => {
    console.log("Email entered:", values.email);
  };

  // verify account 
  const verifyAccount = async () => {
    try {
      console.log("hello");
      const response = await initialRegistration({
        variables: {
          userInput: {
            userType: 'VENDOR', // Example values, replace with your state values
            customerSubType: 'MANUFACTURER_EXPORTER', // Example values, replace with your state values
            vendorSubType: null, // Example values, replace with your state values
            overseasAgentSubType: null, // Example values, replace with your state values
          },
          emailInput: {
            email: "chawlas123456@gmail.com",
            otp: "0799"
          },
        },
      });
      // const response = await sendOTPMutation({
      //   variables: {
      //     email: "chawlas12456@gmail.com"
      //   }
      // })

      // Data contains the response from the mutation
      console.log('Registration Data:', response);
      dispatch(updateFormName("passCreation"))
    } catch (error: any) {
      // Handle any errors that occur during the mutation
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="h-3/4 bg-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-lg sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-sky-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="mt-5 w-full sm:flex sm:items-center">
              <div className="w-11/12 mx-auto sm:max-w-xs py-8">
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={validationSchema}
                  onSubmit={
                    async (values, { setSubmitting }) => {
                      dispatch(updateEmail(values.email));
                      setEmail(values.email);

                      try {
                        const response = await sendOTPMutation({
                          variables: {
                            email: values.email,
                          },
                        });

                        console.log(response?.data?.sendOTP);


                        if (response?.data?.sendOTP === "OTP sent successfully") {
                          setSendOtpClicked(true);
                          setResendDisabled(true);
                          setTimeout(() => {
                            setResendDisabled(false);
                          }, 120000); // 2 minutes
                        }
                      } catch (error) {
                        console.log(error);
                      }

                      setSubmitting(false);
                    }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        placeholder="you@example.com"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <button
                        type="submit"
                        disabled={resendDisabled}
                        className={`mt-6 inline-flex items-center justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:ml-3 sm:mt-0 sm:w-auto ${resendDisabled ? "bg-sky-200" : "bg-sky-500 hover:bg-sky-400"
                          }`}
                      >
                        {isSubmitting && resendDisabled ? "Sending..." : "Send OTP"}

                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              {sendOtpClicked ? (
                <p>We have sent a code to your email {email}</p>
              ) : (
                <p>Enter email and verify your mail to be one step ahead</p>
              )}
            </div>
          </div>
          <form>
            <div className="flex flex-col space-y-16 mt-3">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="w-12 h-12" key={index}>
                    <input
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-600 focus:outline-none focus:border-sky-600 text-sm pl-2"
                      type="text"
                      name={`digit-${index + 1}`}
                      id={`digit-${index + 1}`}
                      maxLength={1}
                      ref={inputRefs.current[index]}
                      onChange={(e) => {
                        handleOtpChange(e, index);
                        setOtp(e.target.value);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <button
                  // type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    verifyAccount();
                  }}
                  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-sky-600 border-none text-white text-sm shadow-sm"
                >
                  Verify Account
                </button>
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive the code?</p>{" "}
                <button
                  className="flex flex-row items-center text-sky-600"
                  disabled={resendDisabled}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    refetch({ email: Email });
                  }}
                >
                  Resend
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
