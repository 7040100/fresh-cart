import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import  axios  from 'axios';



export default function NewPassword() {
  let Navigate = useNavigate()
  const [isLoding, setIsLoding] = useState(false)
  const [apiError, setApiError] = useState("")


  let validationSchema = Yup.object().shape({
    email:Yup.string().email("email is invalid").required("email is required"),
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"password must be valid Upercase").required("password is required"),

  })

  function handleNewPassword(formValue) {
setIsLoding(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,formValue)
    .then((response)=>{
      setIsLoding(false)
      Navigate("/")
      })
    .catch((error)=>{
      setIsLoding(false)
      setApiError(error?.message)
      })

    // console.log(formValue);
    
  }

  let formik = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },
    validationSchema,
    onSubmit:handleNewPassword
  })
return (
  <>
  <div className="my-7 py-20 mb-7  w-3/4  mx-auto bg-slate-50 shadow-lg bg-asset p-5">

  {apiError?<>
    <div className="p-4  mb-5 max-w-4xl mx-auto flex justify-center items-center  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {apiError}
</div>
  </> :null}

      <h2 className='text-center text-4xl text-green-600 mb-5 '>New Password</h2>
      <form onSubmit={formik.handleSubmit} >
       
   <div className="mb-5 max-w-4xl mx-auto">
<label htmlFor="email" className="block mb-2 text-medium font-medium text-gray-900 ">Your Email</label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
</div>

{formik.errors.email && formik.touched.email ?  <div className="p-4 mb-5 max-w-4xl mx-auto  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.email}
</div>
:null}



<div className="mb-5 max-w-4xl mx-auto">
<label htmlFor="newPassword" className="block mb-2 text-medium font-medium text-gray-900 ">Your newPassword</label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" name='newPassword' id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
</div>

{formik.errors.newPassword && formik.touched.newPassword ?  <div className="p-4 mb-5 max-w-4xl mx-auto  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formik.errors.newPassword}
</div>
:null}


<div className='flex justify-center items-center'>
    <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className=" btn-d bg-main text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-medium w-full sm:w-auto px-7 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoding?<i className='fas fa-spinner fa-spin'></i>:"Reset Password"}
       </button>
 
      </div>   

    
          
          

        
      </form>
    </div>
  </>
  )
}
