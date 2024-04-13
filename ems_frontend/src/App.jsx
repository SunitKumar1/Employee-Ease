import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter,Routes,Route} from 'react-router-dom'  
import EmployeeComponent from './components/EmployeeComponent'
import ViewEmployeeComponent from './components/ViewEmployeeComponent'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<ListEmployeeComponent/>}></Route>
        <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
        <Route path='/add-employees' element={<EmployeeComponent/>}></Route>
        <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
        <Route path='/view-employee/:id' element={<ViewEmployeeComponent/>}></Route>
      </Routes>  
      <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
