export const getJWT = () => {
  const jwt = localStorage.getItem('jwt');
  return jwt;
};

export const clearJWT = () => {
  this.localStorage.removeItem('jwt');
};
