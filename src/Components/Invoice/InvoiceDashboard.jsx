import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const InvoiceDashboard = () => {
  const invoiceSections = [
    {
      name: 'Create Invoice',
      link: '/invoice/create',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Invoice',
    },
    // {
    //   name: 'Update Invoice',
    //   link: '/invoice/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Admin Info',
    // },
    {
      name: 'View Invoice',
      link: '/invoice/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Invoice Info',
    },
    // {
    //   name: 'Delete Invoice',
    //   link: '/invoice/delete',
    //   bgColor: 'bg-red-500',
    //   hoverColor: 'bg-red-600',
    //   icon: 'delete',
    //   action: 'Delete Invoice',
    // },
  ];
  return (
    <>
    <DashboardLayout pageName={'Invoice Dashboard'} sections={invoiceSections}/>
    </>
  )
}

export default InvoiceDashboard