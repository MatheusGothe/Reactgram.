import "./Navbar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import {logout,reset} from '../slices/authSlice'
import { useState,useEffect } from "react";

import { searchUsers } from "../slices/userSlice";
import { uploads } from "../utils/config";

import { useRef } from "react";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);

  const searchFormRef = useRef();
  const usersSearchRef = useRef();

  const [query,setQuery] = useState('')
  let search = query
  const navigate = useNavigate()

  const dispatch = useDispatch()

   // dispatch(searchUsers(search))

   let timeoutId;

   useEffect(() => {
     clearTimeout(timeoutId);
     timeoutId = setTimeout(() => {
       dispatch(searchUsers(search));
     }, 100); // delay of 500ms
   }, [search]);



  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()

  }

  return (
    <>
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form" onSubmit={handleSearch} ref={searchFormRef} >
        <BsSearch className="bs-search" onClick={handleSearch} />
        <input
          type="text"
          className="inputBusca"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>
      {query && (
  <div className="users-search" ref={usersSearchRef}>
    {users && (
      users.map((user) => (
        <div
          className="div-search"
          onClick={() => {
            setQuery('');
            navigate(`/users/${user._id}`);
          }}
          key={user._id}
        >
          <img
            className="search-img"
            src={`${uploads}/users/${user.profileImage}`}
            alt=""
          />
          <p style={{ color: "black" }}>{user.name} </p>
        </div>
      ))
    )}
    {users.length < 1 && (
      <>
        <p style={{ color:"black"}} >Nenhum usuário encontrado</p>
      </>
    ) }
  </div>
)}
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  </>
  );
};

export default Navbar;
