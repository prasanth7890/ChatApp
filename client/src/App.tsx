import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Homepage} />
        <Route path='/chats' Component={Chatpage}/>
      </Routes>
    </div>
  );
}

export default App;
