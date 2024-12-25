import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const CustomerDashboard = () => {
  const customerSections = [
    {
      name: 'Register Customer',
      link: '/customer/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Register New Customer',
    },
    // {
    //   name: 'Update Customer',
    //   link: '/customer/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Customer Info',
    // },
    {
      name: 'View Customer',
      link: '/customer/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Customer Info',
    },
    {
      name: 'Delete Customer',
      link: '/customer/delete',
      bgColor: 'bg-red-500',
      hoverColor: 'bg-red-600',
      icon: 'delete',
      action: 'Delete Customer',
    },
  ];
  return (
    <>
      <DashboardLayout pageName={'Customer Dashboard'} sections={customerSections} />
    </>
  )
}

export default CustomerDashboard