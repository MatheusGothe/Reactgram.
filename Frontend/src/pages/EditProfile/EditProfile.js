import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [ErrorTamPassword,setErrorTamPassword] = useState(false)

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const resetErrors = () => {
    setTimeout(() => {
      setNameError(false);
      setPasswordError(false);
      setErrorTamPassword(false)
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      name
    };  

    if (name.length < 2) {
      setNameError(true);
      resetErrors()
      return;
    } else {
      setNameError(false);
    }


    if (profileImage) {
      userData.profileImage = profileImage;
    //  setProfileImage(profileImage)
    }
    if (email){
      userData.email = email
    //  setEmail(email)
    }
    if (bio) {
      userData.bio = bio;
   
    }
    if (password) {
      if (password !== confirmNewPassword) {
      setPasswordError(true);
    //  resetErrors()
      return;
     }
    if(password.length < 6){
      setErrorTamPassword(true)
    //  resetErrors()
      return
    }
    userData.password = password;
    userData.oldPassword = oldPassword
  }
    // build form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);
 
    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setPreviewImage(image);
    setProfileImage(image);
  };
  

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você.
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) =>e.preventDefault()}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <label>
          <span>Imagem de Perfil</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio</span>
          <input
            type="text"
            placeholder="Descriçao do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Deseja alterar a senha? Digite sua senha antiga</span>
          <input
            type="password"
            placeholder="Digite a sua senha antiga"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword || ""}
          />
        </label>
        <label>
          <span>Digite sua nova senha</span>
          <input
            type="password"
            placeholder="Digite a sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        <label>
          <span>Confirme sua nova senha</span>
          <input
            type="password"
            placeholder="Digite a sua nova senha"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword || ""}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
        {nameError && <Message msg={"O nome precisa ter 2 caracteres "} type="error" />}
        {passwordError && <Message msg={"Senhas nao coincidem"} type="error" />}
        {ErrorTamPassword && <Message msg={"A senha precisa ter no mínimo 6 caracteres"} type="error" /> }
      </form>
    </div>
  );
};

export default EditProfile;
