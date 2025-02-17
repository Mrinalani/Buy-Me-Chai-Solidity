import React, { useState } from "react";

const Buy = ({state}) => {
  const [data, setData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const contract = state.contract;
    console.log("checking values",data.name, data.message, contract)
  }


  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" value={data.name} name="name" onChange={handleChange} placeholder="Name" />
        </div>

        <div>
          <label htmlFor="">Message</label>
          <input type="text" value={data.message} name="message" onChange={handleChange} placeholder="Message" />
        </div>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

export default Buy;
