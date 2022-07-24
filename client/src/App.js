import "./App.scss";
// import 'swiper'
import './assets/boxicons-2.1.1/css/boxicons.min.css'
import { Link,Outlet} from "react-router-dom";


import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Router from "./config/Router";

function App() {
  return (
    <>
      
      <Header />
        <Router/>
      {/* <Footer />  */}
      
      
    </>
  );
}

export default App;
