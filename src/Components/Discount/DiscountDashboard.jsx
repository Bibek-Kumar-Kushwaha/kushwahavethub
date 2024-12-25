import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const DiscountDashboard = () => {
  const discountSections = [
    {
      name: 'Add Discount',
      link: '/discount/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Discount',
    },
    // {
    //   name: 'Update Discount',
    //   link: '/discount/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Discount Info',
    // },
    {
      name: 'View Discount',
      link: '/discount/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Discount Info',
    },
    {
      name: 'Delete Discount',
      link: '/discount/delete',
      bgColor: 'bg-red-500',
      hoverColor: 'bg-red-600',
      icon: 'delete',
      action: 'Delete Discount',
    },
  ];
  return (
    <>
      <DashboardLayout pageName={'Discount Dashboard'} sections={discountSections} />
    </>
  )
}

export default DiscountDashboard