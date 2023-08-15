import './Auth.css'

// Components
import {Link} from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'

// React Icons
import { FaEnvelope, FaLock, FaUnlock,FaEye, FaEyeSlash, FaFontAwesome } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'

// Redux
import {login, reset} from '../../slices/authSlice'

const Login = () => {
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const dispatch = useDispatch()

  const {loading, error} = useSelector((state) => state.auth )

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    dispatch(login(user))
  }

  const handleShowPassword = () =>{
      if(showPassword == true){
        setShowPassword(false)
      }else{
        setShowPassword(true)
      }
  }


  // Clean all states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <MdAlternateEmail className="icon" />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="E-mail"
          value={email}
        />
        <FaUnlock className="icon" />
        <div className="input-container">
          {showPassword ? (
            <FaEye className="show-password" onClick={handleShowPassword} />
          ) : (
            <FaEyeSlash
              className="show-password"
              onClick={handleShowPassword}
            />
          )}
        </div>

        <input
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          value={password}
        />
        <p>
          Esqueceu sua senha?{" "}
          <Link className="link" to="/reset-password">
            Clique aqui
          </Link>{" "}
        </p>
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>{" "}
      </p>
    </div>
  );
}

export default Login