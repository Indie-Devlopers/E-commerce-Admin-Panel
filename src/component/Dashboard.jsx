
import './dashboard.css'
import Cards from './layouts/Cards'
import Sidenav from './layouts/Sidenav'
const Dashboard = () => {
  return (
      <>
 
  <Sidenav/>
  <section className="home-section">
    <div id="header">
      <div className="header uboxed">
        <ul className="logo">
          <li>
            <img src="https://byjaris.com/img/byjaris.svg" alt="Fimanbol" />
          </li>
        </ul>
        <ul className="menu">
          <li>
            <img
              src="https://byjaris.com/code/icons/home-alt.svg"
              alt="Fimanbol"
            />
          </li>
          <li>
            <img
              src="https://byjaris.com/code/icons/menu-alt.svg"
              alt="Fimanbol"
            />
          </li>
          <li>
            <div id="lang">
              <div className="selected">
                <img
                  src="https://byjaris.com/code/icons/flag-en.svg"
                  alt="English"
                />
              </div>
              <div className="options">
                <a href="#">
                  <img
                    src="https://byjaris.com/code/icons/flag-en.svg"
                    alt="English"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://byjaris.com/code/icons/flag-pt.svg"
                    alt="Português"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://byjaris.com/code/icons/flag-es.svg"
                    alt="Español"
                  />
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="header-space" />
    <div className="text">
      Dashboard
    </div>
      

      <Cards/>
  </section>


    </>
  )
}

export default Dashboard
