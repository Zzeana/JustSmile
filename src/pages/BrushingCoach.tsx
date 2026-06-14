import { Link } from 'react-router-dom'
import { ToothAccent } from '../components/mascot/ToothAccent'
import { TOOTH_ROLES } from '../components/mascot/toothRoles'
import { BrushingCoachSession } from '../components/brushing/BrushingCoachSession'
import { PAGE_BODY, PAGE_SHELL } from '../components/layout/pageLayout'
import { GradientScreen } from '../components/ui/GradientScreen'

/** Standalone brushing page - redirects users to /coach for full experience. */
export function BrushingCoach() {
  return (
    <GradientScreen className="min-h-full">
      <div className={PAGE_SHELL}>
        <div className="flex items-start gap-4">
          <ToothAccent color={TOOTH_ROLES.habits} size={44} />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#5E89ED]">Brushing coach</p>
            <h1 className="font-heading text-[1.625rem] font-bold leading-tight text-[#191919]">
              Two calm minutes
            </h1>
            <p className="text-[15px] leading-relaxed text-[#667085]">
              We&apos;ll guide each area so brushing feels simple and steady.
            </p>
          </div>
        </div>

        <div className={PAGE_BODY}>
          <BrushingCoachSession />
          <p className="text-center text-sm">
            <Link to="/coach" className="font-semibold text-[#5E89ED]">
              Open JustSmile Coach for questions and support
            </Link>
          </p>
        </div>
      </div>
    </GradientScreen>
  )
}
