import { NavLink, Outlet } from 'react-router-dom'
import { APP_MAX_WIDTH, MAIN_SHELL, NAV_SHELL } from './layout/pageLayout'
import { AssistantBottomSheet } from './assistant/AssistantBottomSheet'
import { FloatingAssistant } from './assistant/FloatingAssistant'
import { NAV_ICON_CLASS, ScanIcon } from './scan/ScanIcon'
import { AssistantProvider } from '../context/AssistantContext'

const nav = [
  {
    to: '/',
    label: 'Home',
    end: true,
    icon: (active: boolean) => (
      <svg className={NAV_ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19v-8.5Z"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: '/scan',
    label: 'Scan',
    end: false,
    icon: (active: boolean) => <ScanIcon active={active} />,
  },
  {
    to: '/coach',
    label: 'Coach',
    end: false,
    icon: (active: boolean) => (
      <svg className={NAV_ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={active ? 2 : 1.6} />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/find-care',
    label: 'Care',
    end: false,
    icon: (active: boolean) => (
      <svg className={NAV_ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: '/habits',
    label: 'Habits',
    end: false,
    icon: (active: boolean) => (
      <svg className={NAV_ICON_CLASS} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export function Layout() {
  return (
    <AssistantProvider>
      <LayoutShell />
    </AssistantProvider>
  )
}

function LayoutShell() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <main className={MAIN_SHELL}>
        <Outlet />
      </main>

      <nav className={NAV_SHELL} aria-label="Main">
        <div className={`mx-auto ${APP_MAX_WIDTH} rounded-[1.75rem] bg-white px-2 py-1.5 shadow-[0_2px_12px_-4px_rgba(25,25,25,0.1),0_8px_24px_-8px_rgba(25,25,25,0.08)]`}>
          <ul className="flex items-center justify-around">
            {nav.map(({ to, label, end, icon }) => (
              <li key={to} className="flex flex-1 justify-center">
                <NavLink
                  to={to}
                  end={end}
                  className="group flex w-full justify-center"
                >
                  {({ isActive }) => (
                    <span
                      className={[
                        'flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 transition-colors duration-200',
                        isActive ? '' : 'group-hover:opacity-80',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'flex h-7 w-7 items-center justify-center transition-colors',
                          isActive ? 'text-[#5E89ED]' : 'text-[#8B95A5] group-hover:text-[#667085]',
                        ].join(' ')}
                      >
                        {icon(isActive)}
                      </span>
                      <span
                        className={[
                          'text-[10px] font-medium leading-none sm:text-[11px]',
                          isActive ? 'font-semibold text-[#5E89ED]' : 'text-[#8B95A5]',
                        ].join(' ')}
                      >
                        {label}
                      </span>
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <FloatingAssistant />
      <AssistantBottomSheet />
    </div>
  )
}
