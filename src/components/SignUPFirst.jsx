import React from 'react'

const SignUP = () => {
  return (
    <div className="body">
      <header className="header">
        <h1>SignUP Page</h1>
      </header>
      <form className="form">
        <div className='Name'>
            <label>Enter Your Name</label>
          <input type="text" placeholder="Enter FirstName" />
          <input type="text" placeholder="Enter LastName" />
        </div>
        <div className='Password'>
            
        </div>
      </form>
    </div>
  );
}

export default SignUP