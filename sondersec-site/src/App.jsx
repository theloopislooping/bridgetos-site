import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import WhatWeTeach from './pages/WhatWeTeach'
import Contact from './pages/Contact'
import About from './pages/About'
import AlgorithmicShadows from './pages/AlgorithmicShadows'
import SafeCurriculum from './pages/SafeCurriculum'

function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/algorithmic-shadows" element={<AlgorithmicShadows />} />
      <Route path="/safe-curriculum" element={<SafeCurriculum />} />
      <Route path="*" element={
        <SiteLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/what-we-teach" element={<WhatWeTeach />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </SiteLayout>
      } />
    </Routes>
  )
}
