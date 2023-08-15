import { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { resetMessage, resetPassword,resetError } from "../../slices/userSlice";
import Message from '../../components/Message'
import { api } from "../../utils/config";
import'./ResetPassword.css'


const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const {loading, error, message, success} = useSelector((state) => state.user)


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    
  
    dispatch(resetPassword(email));

   setTimeout(() => {
    console.log('apagou')
    dispatch(resetMessage());
    dispatch(resetError())
  }, 3000);
  };


  return (
    <div id="reset-form">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ marginBottom: "10px" }}>E-mail:</label>
        <input 
          style={{ marginBottom: "10px" }}
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        {!loading && <input type="submit" className="button1" value="Enviar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />} 
        {message && <Message msg={message} type="success" /> } 
      </form>
    </div>
  );
};

export default ResetPassword;
