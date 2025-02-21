import { ethers } from "ethers";
import React, { useState } from "react";

const BuyChai = ({state}) => {
  const [data, setData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const contract = state.contract;
    console.log("checking values",data.name, data.message, contract)
    const amount = {value: ethers.parseEther('0.001')}
    const transaction = await contract.buyChai(data.name, data.message, amount);
    await transaction.wait();
  }

   console.log("checking",state.contract)
  return (
    <div className='buy-container'>
      <form className='buy-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-label'>Name</label>
          <input
            className='form-input'
            type='text'
            placeholder='Enter your name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Message</label>
          <input
            className='form-input'
            type='text'
            placeholder='Enter message'
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
        </div>
        <button className='form-button' disabled={!state.contract}>
          Pay
        </button>
      </form>
    </div>

  );
};

export default BuyChai;
