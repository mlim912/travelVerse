import { BrowserRouter } from "react-router-dom";

import { Overview, Contact, Features, Hero, Navbar, Tech, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero /> 
        </div>
        <Overview />
        <Features />
        <div className='relative z-0'>
          <Tech /> 
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
