import { MOCK_LOW_COST_CLINICS } from '../data/findCareClinics'
import { CareCoachHero, ClinicResourceCard } from '../components/care/CareSections'
import { PageHeader } from '../components/layout/PageHeader'
import { PAGE_BODY, PAGE_SHELL } from '../components/layout/pageLayout'
import { GradientScreen } from '../components/ui/GradientScreen'
import { useAssistant, CARE_COACH_PROMPTS } from '../context/AssistantContext'

export function FindCare() {
  const { openCareSheet, launchCoach } = useAssistant()

  function openCoachWithPrefill(prefill: string) {
    launchCoach({
      source: 'care',
      intro: 'Tell me what you need — cost, anxiety, insurance, or urgency — and I can help you start.',
      prefill,
      suggestedPrompts: CARE_COACH_PROMPTS,
    })
  }

  return (
    <GradientScreen className="min-h-full">
      <div className={PAGE_SHELL}>
        <PageHeader title="Find Care" />

        <div className={PAGE_BODY}>
          <CareCoachHero
            onOpenCoach={() => openCareSheet()}
            onChipSelect={(prefill) => openCoachWithPrefill(prefill)}
          />

          <section className="space-y-6">
            <h2 className="type-section text-[#191919]">Nearby options</h2>
            <ul className="space-y-6">
              {MOCK_LOW_COST_CLINICS.map((c) => (
                <li key={c.id}>
                  <ClinicResourceCard clinic={c} />
                </li>
              ))}
            </ul>
          </section>

          <p className="text-center text-[11px] text-[#8B95A5]">
            Call ahead to confirm hours and availability.
          </p>
        </div>
      </div>
    </GradientScreen>
  )
}
