import React from 'react';

function App({ children }) {
  var header = <section className="hero is-primary is-medium">
  <div className="hero-head">
    <header className="nav">
      <div className="container">
        <div className="nav-left">
          <a className="nav-item"> 
              <span className="title">Pokémap</span>
          </a>
        </div>        
        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="nav-right nav-menu">
          <a className="nav-item is-active">
            Map
          </a>
          <a className="nav-item">
            About
          </a>
          <span className="nav-item">
          </span>
          <span className="nav-item">
          </span>
          
        </div>
      </div>
    </header>
  </div>



  <div className="hero-foot">
    <nav className="tabs">
      <div className="container">
        <ul>
          <li className="is-active"><a>Overview</a></li>
          <li><a>Routes</a></li>
        </ul>
      </div>
    </nav>
  </div>
</section>

  return <main>
      {header}
      {children}
    </main>;
}

export default App;