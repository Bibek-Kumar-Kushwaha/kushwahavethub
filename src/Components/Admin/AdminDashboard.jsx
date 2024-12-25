import React from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const AdminDashboard = () => {
  const adminSections = [
    {
      name: 'Register As Admin',
      link: '/admin/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Admin',
    },
    // {
    //   name: 'Update Admin',
    //   link: '/admin/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Admin Info',
    // },
    {
      name: 'View Admin',
      link: '/admin/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Admin Info',
    },
    {
      name: 'Get Own Profile',
      link: '/admin/profile',
      bgColor: 'bg-purple-500',
      hoverColor: 'bg-purple-600',
      icon: 'user',
      action: 'Get Own Profile',
    },
  ];

  return (
    <DashboardLayout pageName="Admin Dashboard" sections={adminSections} />
  );
};

export default AdminDashboard;
