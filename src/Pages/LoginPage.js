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
        console.log(data2Send);
        await login(data2Send);
        setData({usuario : '', contrasenna : ''})
        setLoadinPage(false);
      }
    }
    SendData();
  }, [loadinPage])
  
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
            <div className='login-form'>
              <form onSubmit={handleForm}>
                <h1 id='login-title'>Iniciar Sesión</h1>
                  <label className='lbl-form' id='usuario'>
                    <div className='box-input-form'>
                      <span id='person' class="material-symbols-outlined">person</span> 
                      <input className='input-form' name='usuario' placeholder='Usuario' value={data.usuario} onChange={handleChange}></input>
                    </div>
                  </label>
                  <label className='lbl-form' id='password'>
                    <div className='box-input-form'>
                      <span id='lock' class="material-symbols-outlined">lock</span>
                      <input type='password' className='input-form' name='contrasenna' placeholder='Contraseña' value={data.contrasenna} onChange={handleChange}></input>
                    </div>
                  </label>
                  <button className='btn-login' type='submit'>Ingresar</button>
              </form>
            </div>
        </section>
        <div className='login-imageBackground'>
  
        </div>
      </div>
      )
  }
}

export default LoginPage