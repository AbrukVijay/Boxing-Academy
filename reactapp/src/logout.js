const Logout = () =>{
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("role");
};
export default Logout;