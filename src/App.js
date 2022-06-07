import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import Home from "./components/Home"
import CostSheet from './components/CostSheet';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/costsheet" component={CostSheet} />
    </Switch>
  );
}

export default App;
