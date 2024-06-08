import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./layout/Homepage"

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}>
        
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App