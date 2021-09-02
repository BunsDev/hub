/** @jsxImportSource theme-ui **/

import { useMemo } from 'react'
import { Flex } from 'theme-ui'

interface Steps {
  stepsData?: { [key: string]: string }
  activeStep?: string
}

const defaultSteps = { start: 'Intro', upload: 'Upload', publish: 'Publish' }

const Steps = ({ stepsData = defaultSteps, activeStep = '' }: Steps) => {
  const steps = useMemo(() => Object.values(stepsData), [stepsData])

  return (
    <Flex
      sx={{
        span: {
          fontWeight: '800',
          fontSize: '20px',
          color: 'rgba(255, 255, 255, 0.5)',
          transition: '.2s all',
          '&:after': {
            content: "'-'",
            m: '0 12px',
            color: 'rgba(255, 255, 255, 0.5)',
          },
          '&:last-child': {
            '&:after': {
              display: 'none',
            },
          },
        },
        'span.active': { color: 'white' },
      }}
    >
      {steps.map((step, index) => (
        <span
          key={step}
          className={index <= steps.indexOf(stepsData[activeStep]) ? 'active' : ''}
        >
          {index + 1}. {step}
        </span>
      ))}
    </Flex>
  )
}

export default Steps
