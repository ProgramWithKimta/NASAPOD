import '../App.css'
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

function NotFound () {
    return (
    <div className="app-wrapper">
        <Header />
        <div className="page-content">
          <p>Sorry the page you are looking for does not exist.</p>
          <p style={style.link}><Link to="/Home">Home</Link></p>
        </div>
        <Footer />
      </div>
    );
};

const style = {
    link: {
        fontWeight: "bold"
    }
}

export default NotFound;