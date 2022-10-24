
import { } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import './App.css';
import { Routes } from "react-router-dom"
import Sidebar from './comps/Sidebar';
import Content from "./comps/Content"
function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid md={3}>
          <Sidebar />
        </Grid>
        <Grid md={9}>
          <Content />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
