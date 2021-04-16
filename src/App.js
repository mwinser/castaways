import './App.css';
import ChoiceBox from './ChoiceBox';
import PlayerDisplay from './components/PlayerDisplay';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {

  

  return (
    <div className="fullscreen">
      <Header/>
      <PlayerDisplay/>
      <Footer/>
      <ChoiceBox />
    </div>
  )
}

export default App;
