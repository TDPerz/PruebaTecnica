import Asignacion from './Component/Asignacion/Asignacion'
import Estudiantes from './Component/Estudiantes/Estudiantes'
import Maestros from './Component/Maestros/Maestros'
import Cursos from './Component/Cursos/Cursos'
import logo from './logo.svg';
import './App.css';
import { Divider } from 'antd';

function App() {
  return (
    <div className="container">
      <Asignacion/>
      <Divider />
      <Estudiantes/>
      <Divider />
      <Maestros/>
      <Divider />
      <Cursos/>
    </div>
  );
}

export default App;
