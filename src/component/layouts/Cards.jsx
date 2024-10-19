import React from "react";

const Cards = () => {
  return (
    <>
      <div className="cards-container">
        <div className="card ">
          <div className="adjust-cards" >
           
            <div className="card-content">
              <div><h3>Budget</h3></div>
              <div><h2>Rs 750.90</h2></div>
              <div>
              <p>
                <span className="positive">↑ 13% </span> 
                <span>Since last month</span>
              </p>
              </div>
            </div>
            <div className="card-icon" style={{ backgroundColor: "#ff4081" }}>
              <i className="fas fa-credit-card" />
            </div>
          </div>
        </div>
        <div className="card">
        <div className="adjust-cards" >
          
          <div className="card-content">
            <h3>Weekly Order</h3>
            <h2>215</h2>
            <p>
              <span className="positive">↑ 30%</span> Since last month
            </p>
          </div>
          <div className="card-icon" style={{ backgroundColor: "#7c4dff" }}>
            <i className="fas fa-users" />
          </div>
          </div>
        </div>

        <div className="card">
        <div className="adjust-cards" >        
          <div className="card-content">
            <h3>Monthly Order</h3>
            <h2>1,400</h2>
            <p>
              <span className="positive">↓ 5%</span> Since last month
            </p>
          </div>
          <div className="card-icon" style={{ backgroundColor: "#00b0ff" }}>
            <i className="fas fa-clock" />
          </div>
          </div>
        </div>

        <div className="card">
        <div className="adjust-cards" >
          
          <div className="card-content">
            <h3>Yearly Order</h3>
            <h2>9500</h2>
            <p>
              <span className="positive">↑ 10%</span> Since last month
            </p>
          </div>
          <div className="card-icon" style={{ backgroundColor: "#ffab00" }}>
            <i className="fas fa-shopping-cart" />
          </div>    
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
