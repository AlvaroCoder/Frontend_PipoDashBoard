import React,{useState, useEffect} from 'react'
import { useUser } from '../Hooks/UserHook';
import LoadingPage from './LoadingPage';

function LoginPage() {
  const {login, error} = useUser();
  const [data, setData] = useState({
    usuario : '',
    contrasenna : ''
  });
  const [loadinPage, setLoadinPage] = useState(false);
  const [errorLogin, setError] = useState(null);
  const handleChange = (evt)=>{
    evt.preventDefault();
    const target = evt.target
    setData({
      ...data,
      [target.name] : target.value
    })
  } 
  const handleForm =(evt)=>{
    evt.preventDefault();
    if (data.usuario.trim() === "" || data.contrasenna.trim() === "") {
      setError({
        message : 'Datos incompletos'
      })
      setTimeout(()=>{
        setError(null)
      },3000)
      return;
    }
    setLoadinPage(true);
  }
  useEffect(() => {
    async function SendData() {
      if (loadinPage) {
        const data2Send = data;
        await login(data2Send);
        setData({usuario : '', contrasenna : ''})
        setLoadinPage(false);
      }
    }
    SendData();
  }, [loadinPage,data,login])
  
  if (loadinPage) {
    return (
      <LoadingPage/>  
    )
  }else{
    return (
      <div className='container-login'>
        <section className='sec-form'>
          {(errorLogin || error) && <div className='error-card'>
            <p>Error : {error.message}</p>
          </div>}
          
            <h1 id='login-title'>Iniciar Sesión</h1>
            <form onSubmit={handleForm}>
                  <label className='lbl-form' id='usuario'>
                    <div className='box-icon'>
                      <span id='person' className="material-symbols-outlined">person</span> 
                    </div>
                    <input className='input-form' name='usuario' placeholder='Usuario' value={data.usuario} onChange={handleChange}></input>
                  </label>
                  <label className='lbl-form' id='password'>
                    <div className='box-icon'>
                      <span id='lock' className="material-symbols-outlined">lock</span>
                    </div>
                    <input type='password' className='input-form' name='contrasenna' placeholder='Contraseña' value={data.contrasenna} onChange={handleChange}></input>
                  </label>
                  <button className='btn-login' type='submit'>Ingresar</button>
              </form>
        </section>
      </div>
      )
  }
}

export default LoginPage