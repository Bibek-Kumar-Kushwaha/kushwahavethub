import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const CategoryDashboard = () => {
  const categorySections = [
    {
      name: 'Add Category',
      link: '/category/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Category',
    },
    // {
    //   name: 'Update Category',
    //   link: '/category/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Category Info',
    // },
    {
      name: 'View Category',
      link: '/category/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Category Info',
    },
    {
      name: 'Delete Category',
      link: '/category/delete',
      bgColor: 'bg-red-500',
      hoverColor: 'bg-red-600',
      icon: 'delete',
      action: 'Delete Category',
    },
  ];
  return (
    <>
      <DashboardLayout pageName="Category Dashboard" sections={categorySections} />
    </>
  )
}

export default CategoryDashboard