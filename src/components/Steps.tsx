/** @jsxImportSource theme-ui **/

import { Flex } from 'theme-ui'

const defaultSteps = ['Intro', 'Upload', 'Publish']

interface Steps {
  steps?: string[]
  activeStep?: string
}

const Steps = ({ steps = defaultSteps, activeStep = '' }: Steps) => {
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
        <span className={index <= steps.indexOf(activeStep) ? 'active' : ''}>
          {index + 1}. {step}
        </span>
      ))}
    </Flex>
  )
}

export default Steps
