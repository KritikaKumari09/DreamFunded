import otpGenerator from "otp-generator"

// ! This method should not be used for otp-genration as Math.Random() outputs are predictable from past outputs
// export const generateOtp = () =>{
//     const digits = "0123456789"
//     let otp = "";
//     for(let i=0;i<6;i++){
//         const idx = Math.floor(Math.random()*10)
//         otp+=digits[idx];
//     }
//     return otp;
// }

//* this package uses crypto for generating otp
export const generateOtp = () =>{
    return otpGenerator.generate(6,{digits: true, lowerCaseAlphabets: false,specialChars: false, upperCaseAlphabets: false})
}

