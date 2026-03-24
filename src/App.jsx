import './App.css'

import Header from './components/Header'

import IntroSec from './components/IntroSec'

import Benefits from './components/Benefits'

import Ventajas from './components/Ventajas'

import NetworkPlanner from './components/Networkplanner'

import Navbar from './components/Navbar'

import Contacto from './components/Contacto'

import Footer from './components/Footer'

import WelcomeModal from './components/WelcomeModal'

// Citegra página web
function App() {

  return (
    <div className="App">
      <WelcomeModal/>
      {/* Navbar */}
      <Navbar/>

      {/* Header */}
      <Header />

      {/* Sección de introducción */}
      <IntroSec/>

      {/* Sección beneficios */}
      <Benefits/>

      {/* Seccion de ventajas */}
      <Ventajas/>

      {/* Pagina contacto */}
      <Contacto/>

      {/* Footer */}
      <Footer/>

      {/* Boton para cambio de idioma */}

      {/* Boton para las redes sociales */}
      
    </div>
  )
}

export default App
