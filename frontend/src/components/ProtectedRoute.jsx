import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if user is logged in
  if (!token) {
    alert('Please login first!');
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert(`Access Denied! This page is only for ${allowedRoles.join(', ')} users.`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
