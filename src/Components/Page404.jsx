import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const Page404 = () => {
    const nav = useNavigate()
    const home = sessionStorage.getItem('home');
    const isLog = sessionStorage.getItem('isLog');
    
    useEffect(() => {
        if (isLog === 'no') {
          nav('/')
        }
      })

    const handleLink = () => {
        nav(home)
    }

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center d-flex align-items-center justify-content-center">
            <div>
              <img
                className="img-fluid w-75"
                src="https://demo.themesberg.com/volt/assets/img/illustrations/404.svg"
                alt="404 not found"
              />
              <h1 className="mt-5">
                Page not <span className="fw-bolder text-primary">found</span>
              </h1>
              <p className="lead my-4">
                Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
              </p>
              <button
                onClick={handleLink}
                className="btn btn-dark d-inline-flex align-items-center justify-content-center mb-4"
              > 
              <ArrowBackOutlinedIcon/>                
                Back to homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
