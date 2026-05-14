import { Route, Routes } from 'react-router-dom'
import Layout from './Layout.jsx'
import HomePage from './pages/Home.jsx'
import DetectPage from './pages/Detect.jsx'
import LibraryPage from './pages/Library.jsx'
import AboutPage from './pages/About.jsx'
import ContactPage from './pages/Contact.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
