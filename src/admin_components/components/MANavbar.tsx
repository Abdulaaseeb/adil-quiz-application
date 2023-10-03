import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
export default function MANavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark fixed-top shadow-lg text-white" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-danger" to="#">Bolier Plate</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li>
                <Link to='/' className="nav-link active" >Components</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active"  to="dasboard/*"><Button className='mx-2 hoverEffect' variant='contained' color='error' >Dashboard</Button></Link>
              </li>
              <li>
                <Link to='comments' className="nav-link active"><Button className='mx-2 hoverEffect' variant='contained' color='error' >Comments</Button></Link>
              </li>
              <li>
                <Link to='login' className="nav-link active"><Button className='mx-2 hoverEffect' variant='contained' color='error' >Login</Button></Link>
              </li>
              <li>
                <Link to='signup' className="nav-link active"><Button className='mx-2 hoverEffect' variant='contained' color='error' >Sign Up</Button></Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
