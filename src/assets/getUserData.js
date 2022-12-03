const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (user) {
    return user;
  }
};
export default getUserData;
