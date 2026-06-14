import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Celebration } from './pages/Celebration'
import { Habits } from './pages/Habits'
import { Home } from './pages/Home'
import { Onboarding } from './pages/Onboarding'
import { Results } from './pages/Results'
import { Coach } from './pages/Coach'
import { FindCare } from './pages/FindCare'
import { Scan } from './pages/Scan'
import { getOnboardingDone } from './lib/storage'

function OnboardingGate() {
  const location = useLocation()
  const done = getOnboardingDone()

  if (!done && location.pathname !== '/welcome') {
    const from = `${location.pathname}${location.search ?? ''}`
    return <Navigate to="/welcome" replace state={{ from }} />
  }
  if (done && location.pathname === '/welcome') {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OnboardingGate />}>
          <Route path="/welcome" element={<Onboarding />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<Navigate to="/scan" replace />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/celebration" element={<Celebration />} />
            <Route path="/coach" element={<Coach />} />
            <Route path="/find-care" element={<FindCare />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
