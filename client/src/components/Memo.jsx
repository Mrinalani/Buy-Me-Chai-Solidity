import React, { useEffect, useState } from 'react'

const Memo = ({state}) => {
    const [memos, setMemos] = useState([]);
    const contract = state.contract;

    const getMemos = async() => {
        const memos = await contract.getMemos();
        console.log("testing memos", memos)

        setMemos(memos)
    }

    useEffect(()=>{
      if(contract){
        getMemos()
      }
    },[contract])

  return (
    <div className='memos-container'>
      <table className='memos-table'>
        <thead>
          <tr>
            <th>From</th>
            <th>Name</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo, index) => (
            <tr key={index} className='memo-row'>
              <td className='memo-from'>{memo.from}</td>
              <td className='memo-name'>{memo.name}</td>
              <td className='memo-message'>{memo.message}</td>
              <td className='memo-timestamp'>{String(memo.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Memo
