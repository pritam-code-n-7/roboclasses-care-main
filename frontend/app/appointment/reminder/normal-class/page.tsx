import { MultiDatePickerForm } from '@/demo/normal-class/multiDatePickerForm'
import React from 'react'

const page = () => {
  return (
    <div className='w-[600px] grid grid-cols-1 ml-96 mt-28'>
    <p className='text-4xl font-bold mb-2'>Book Bulk Appointments</p>
    <MultiDatePickerForm />
  </div>
  )
}

export default page
