import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle, FaTimesCircle, FaRedoAlt } from 'react-icons/fa'; // FontAwesome icons
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

export default function SampleDemo() {
    const [token, setTokens] = useState('');
    const [otp, setOtp] = useState('');
    const [isValid, setIsValid] = useState(null); // To handle OTP validation status
    const [isResending, setIsResending] = useState(false); // To handle resend state
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const email = sessionStorage.getItem('email');
    const nav = useNavigate();
    const [confirm, setConfirm] = useState('');
    const link = sessionStorage.getItem('otpLink')

    const validateOtp = () => {
        axios
          .get(`http://localhost:1310/mailServices/verifyOtp/${token}`)
          .then((response) => {
                console.log(response.data);
                if(response.data === "Success"){
                    console.log("condition verified");
                    setTimeout(() => setOpen(false), 3000);
                    setSnackMsg("OTP verified");
                    setSeverity("success");
                    setOpen(true); // Show Snackbar
                    setTimeout(() => {
                        setOpen(false);
                        nav(link);
                    }, 3000);
                    
                } else {
                    setSnackMsg("Invalid OTP");
                    setSeverity("error");
                  setOpen(true); // Show Snackbar
                  setTimeout(() => setOpen(false), 3000);
                  
                }
                setConfirm(response.data);
                // sessionStorage.setItem('otp',response.data)
            })
            .catch(err => console.log(err));            
        };

        console.log(confirm);
        
        const sendOtp = () => {
            axios
            .get(`http://localhost:1310/mailServices/${email}`)
            .then((response) => {
                console.log(response.data);
                setSnackMsg("OTP sent!!!");
                setSeverity("success");
                setOpen(true); // Show Snackbar
                setTimeout(() => setOpen(false), 3000);
                // sessionStorage.setItem('otp',response.data)
              })
          .catch(err => console.log(err));        
    }

    const resendOtp = async () => {
        setIsResending(true);
        sendOtp();
        // Simulate API call
        setTimeout(() => {
            setIsResending(false);
            console.log('OTP resent');
           
        }, 1000);
    };

    const customInput = ({ events, props }) => {
        return (
            <>
                <input {...events} {...props} type="text" className="custom-otp-input" />
                {props.id === 6 && (
                    <div className="px-3">
                        <i className="pi pi-minus" />
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="card flex justify-content-center p-4 m-5">
            <div className="container d-flex flex-column align-items-center">
                <h2 className="text-center mb-4">
                    <FaEnvelope className="text-primary" /> Authenticate Your Account
                </h2>
                <p className="text-center mb-4 text-muted">
                    Please enter the code sent to your Email ID <br /> <span className="font-weight-bold">{email}</span>.
                </p>
                <div className="otp-container mb-4">
                    <InputOtp
                        value={token}
                        onChange={(e) => setTokens(e.value)}
                        length={6}
                        inputTemplate={customInput}
                        style={{ gap: '10px' }}
                    />
                </div>
                <div className="d-flex mx-4 justify-content-evenly">
                    <Button
                        className="btn btn-primary "
                        onClick={validateOtp}
                    >
                        Verify
                    </Button>
                    <Button
                        className="btn btn-secondary mx-3"
                        onClick={resendOtp}
                        disabled={isResending}
                    >
                        {isResending ? 'Resending...' : <><FaRedoAlt className="p-mr-2" /> Resend Code</>}
                    </Button>
                </div>
                {isValid === false && (
                    <p className="text-danger mt-2">
                        <FaTimesCircle className="p-mr-2" />
                        OTP is invalid. Please try again.
                    </p>
                )}
                {isValid === true && (
                    <p className="text-success mt-2">
                        <FaCheckCircle className="p-mr-2" />
                        OTP is valid!
                    </p>
                )}
            </div>
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
                            {snackMsg}
                        </Alert>
                    </Snackbar>

            <style jsx>{`
                .custom-otp-input {
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                    text-align: center;
                    border-radius: 4px;
                    border: 1px solid #007ad9;
                    background-color: #f4f4f4;
                    transition: all 0.3s;
                    outline: none;
                }

                .custom-otp-input:focus {
                    border-color: #007ad9;
                    box-shadow: 0 0 5px rgba(0, 122, 217, 0.5);
                }

                .otp-container {
                    display: flex;
                    justify-content: center;
                }

                .text-primary {
                    color: #007ad9;
                }

                .text-muted {
                    color: #6c757d;
                }

                .text-danger {
                    color: #dc3545;
                }

                .text-success {
                    color: #28a745;
                }

                .font-weight-bold {
                    font-weight: bold;
                }

                .p-button-secondary {
                    background-color: #6c757d;
                    border-color: #6c757d;
                }

                .p-button-secondary:disabled {
                    background-color: #d6d6d6;
                    border-color: #d6d6d6;
                    cursor: not-allowed;
                }

                .p-button {
                    font-size: 1rem;
                }

                .p-button-primary {
                    background-color: #007ad9;
                    border-color: #007ad9;
                }
            `}</style>
        </div>
    );
}
