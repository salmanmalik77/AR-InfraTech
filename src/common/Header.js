import './Header.css'; // Optional: For styling the header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/"><h1>AR InfraTech</h1></a>
      </div>
      <nav className="nav">
        <ul>
          {/* <li><a href="/">Home</a></li> */}
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/careers">Careers</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;