export const validateEmail =(email)=>{
    const emailValidate=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email) return "Email is required";
    if (!emailValidate.test(email))return "Invalid email format";
    return null;
};



export const validatePassword=(password)=>{
    // const passwordValidate=/^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if(!password) return "password is required";
    // if(!passwordValidate.test(password))return "password must be at least 6 characters,include an uppercase letter and a number ";
    return null;
};


export const validateUsername=(username)=>{
    if (!username) return "Username is required";
    if (username.length<3) return "Username must be at least 3  characters";
    return null;
};