import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'

const pageMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageMotion}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
