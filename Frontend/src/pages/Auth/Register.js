import './Auth.css'

// Components
import {Link } from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'

// React icons
import { FaUser,FaLock, } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'


// Redux
import {register, reset} from '../../slices/authSlice'
import { resetMessage, resetPassword } from '../../slices/userSlice'


const Register = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassoword] = useState('')


  const dispatch = useDispatch()

  const {loading, error} = useSelector((state) => state.auth)



  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }
    console.log(user)

    dispatch(register(user))
    

  }

  // Clean all auth states
  useEffect(() => {
    dispatch(reset())
  },[dispatch] )


  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos</p>
      <form onSubmit={handleSubmit}>
        <FaUser className='icon' />
        <input className='input'
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nome"
          value={name}
        />
        <MdAlternateEmail className="icon" />
        <input className='input'
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
          value={email}
        />
        <FaLock className="icon" />
        <input className='input'
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
          value={password}
        />
        <FaLock className="icon" />
        <input className='input'
          onChange={(e) => setConfirmPassoword(e.target.value)}
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg = {error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Entre aqui.</Link>
      </p>
    </div>
  );
}

export default Register