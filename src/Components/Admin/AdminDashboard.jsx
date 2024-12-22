import React from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const AdminDashboard = () => {
  const adminSections = [
    {
      name: 'Add Admin',
      link: '/admin/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Admin',
    },
    {
      name: 'Update Admin',
      link: '/admin/update',
      bgColor: 'bg-yellow-500',
      hoverColor: 'bg-yellow-600',
      icon: 'update',
      action: 'Update Admin Info',
    },
    {
      name: 'View Admin',
      link: '/admin/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Admin Info',
    },
    // {
    //   name: 'Delete Admin',
    //   link: '/admin/delete',
    //   bgColor: 'bg-red-500',
    //   hoverColor: 'bg-red-600',
    //   icon: 'delete',
    //   action: 'Delete Admin',
    // },
  ];

  return (
    <DashboardLayout pageName="Admin Dashboard" sections={adminSections} />
  );
};

export default AdminDashboard;
