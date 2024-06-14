import './App.css';
import RegisterForm from "./components/RegisterForm";
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      {<RegisterForm></RegisterForm>}
    </div>
  );
}

export default App;
