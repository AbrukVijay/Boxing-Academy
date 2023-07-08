import React from 'react';

const Logout = () => {
  sessionStorage.removeItem('isAuth');
  sessionStorage.removeItem('role');
  localStorage.clear();
};

export default Logout;
