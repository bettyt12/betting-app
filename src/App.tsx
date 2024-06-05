import { Provider } from 'react-redux';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import store from './redux/store/store';

function App() {
  return (
    <>
   <Provider store={store}>
     <HomeScreen/>
   </Provider>

   </> 
    // </div>
  );
}

export default App;