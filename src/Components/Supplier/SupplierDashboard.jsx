import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const SupplierDashboard = () => {
  const supplierSections = [
    {
      name: 'Add Supplier',
      link: '/supplier/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Supplier',
    },
    {
      name: 'Update Supplier',
      link: '/supplier/update',
      bgColor: 'bg-yellow-500',
      hoverColor: 'bg-yellow-600',
      icon: 'update',
      action: 'Update Supplier Info',
    },
    {
      name: 'View Supplier',
      link: '/supplier/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Supplier Info',
    },
    {
      name: 'Delete Supplier',
      link: '/supplier/delete',
      bgColor: 'bg-red-500',
      hoverColor: 'bg-red-600',
      icon: 'delete',
      action: 'Delete Supplier',
    },
  ];
  return (
    <>
      <DashboardLayout pageName={'Supplier Dashboard'} sections={supplierSections}/>
    </>
  )
}

export default SupplierDashboard