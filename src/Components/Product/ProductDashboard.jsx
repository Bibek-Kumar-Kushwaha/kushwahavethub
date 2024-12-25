import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const ProductDashboard = () => {
  const productSections = [
    {
      name: 'Add Product',
      link: '/product/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Product',
    },
    // {
    //   name: 'Update Product',
    //   link: '/product/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Product Info',
    // },
    {
      name: 'View Product',
      link: '/product/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Product Info',
    },
    {
      name: 'Delete Product',
      link: '/product/delete',
      bgColor: 'bg-red-500',
      hoverColor: 'bg-red-600',
      icon: 'delete',
      action: 'Delete Product',
    },
  ];
  return (
    <>
    <DashboardLayout pageName={'Product Dashboard'} sections={productSections}/>
    </>
  )
}

export default ProductDashboard