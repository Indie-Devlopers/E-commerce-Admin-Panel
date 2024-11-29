import { Link } from 'react-router-dom';


const Sidenav = () => {
  return (
    <>
    <div className="sidebar">
    <div className="logo-details">
      {/* <i className="bx bxl-c-plus-plus icon" /> */}
      <div className="logo_name">Maharaja33</div>
      <i className="bx bx-menu" id="btn" />
    </div>
    <ul className="nav-list">
      <li>
        <i className="bx bx-search" />
        <input type="text" placeholder="Search..." />
        <span className="tooltip">Search</span>
      </li>
      <li>
        <a href="#">
        <Link to='/dashboard'>
          <i className="bx bx-grid-alt" />
          <span className="links_name">Dashboard</span>
          </Link>
        </a>
        <span className="tooltip">Dashboard</span>
      </li>
      <li>
        <Link to='/products'>
          <i className="bx bx-user" />
          <span className="links_name">View Products</span>
          </Link>
        <span className="tooltip">View Products</span>
      </li>
      <li>
        
        <a href="#">
        <Link to='/postdata'>
        <i className="fa-brands fa-product-hunt"></i>
          <span className="links_name">Add Product</span>
          </Link>
        </a>
        <span className="tooltip">Add Product</span>
      </li>
      <li>
        
        <a href="#">
        <Link to='/category'>
        <i className="fa-brands fa-product-hunt"></i>
          <span className="links_name">Add Category</span>
          </Link>
        </a>
        <span className="tooltip">Add Category</span>
      </li>
      {/* <li>
        <Link to='/postdata/varients'>
          <i className="bx bx-user" />
          <span className="links_name">Varient</span>
          </Link>
        <span className="tooltip">Varient</span>
      </li> */}
     
      <li>
        <Link to='/prodictlist'>
          <i className="bx bx-pie-chart-alt-2" />
          <span className="links_name">Analytics</span>
        </Link>
        <span className="tooltip">Analytics</span>
      </li>
     
      <li>
        <a href="#">
          <i className="bx bx-cart-alt" />
          <span className="links_name">Order</span>
        </a>
        <span className="tooltip">Order</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-heart" />
          <span className="links_name">Saved</span>
        </a>
        <span className="tooltip">Saved</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-cog" />
          <span className="links_name">Setting</span>
        </a>
        <span className="tooltip">Setting</span>
      </li>
     
      <li className="profile">
        <div className="profile-details">
          <img src="" alt="profileImg" />
          <div className="name_job">
            <div className="name">Admin Name</div>
            {/* <div className="job">Web designer</div> */}
          </div>
        </div>
        <i className="bx bx-log-out" id="log_out" />
      </li>
    </ul>
  </div>
    </>
  )
}

export default Sidenav
