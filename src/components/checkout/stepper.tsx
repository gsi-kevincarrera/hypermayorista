interface Props {
  steps: string[]
  currentStep: number
  goToStep: (step: number) => void
}

export default function Stepper({ steps, currentStep, goToStep }: Props) {
  return (
    <div className='bg-white border-b'>
      <div className='container mx-auto py-4'>
        <div className='flex justify-between'>
          {steps.map((step, index) => (
            <button
              key={step}
              onClick={() => goToStep(index)}
              className='flex flex-col items-center focus:outline-none'
              disabled={index > currentStep}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-[#581c87] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  index <= currentStep ? 'text-[#581c87]' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
