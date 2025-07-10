import { redirect } from 'react-router-dom';

export const adminAuthLoader = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user || user?.role !== 'admin') {
    return redirect('/admin/login');
  }
  
  return null;
};