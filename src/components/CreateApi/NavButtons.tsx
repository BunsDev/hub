/** @jsxImportSource theme-ui **/

import { useRouter } from 'next/router'
import { Button, Flex } from 'theme-ui'
import { createApiSteps } from '../../utils/createWrapper'

interface NavButtonProps {
  label: string
  onClick: () => {}
  disabled?: boolean
}
interface Props {
  backBtn?: NavButtonProps
  nextBtn?: NavButtonProps
  continueEnabled?: boolean
}

const NavButtons = ({ backBtn, nextBtn, continueEnabled }: Props) => {
  const router = useRouter()

  return (
    <Flex sx={{ justifyContent: 'space-between', mt: '2.5rem' }}>
      <Button
        variant="secondaryMedium"
        onClick={(e) => {
          e.preventDefault()
          backBtn?.onClick() ||
            router.push(router.pathname + `?activeTab=${createApiSteps[0]}`)
        }}
      >
        {backBtn?.label || 'Back'}
      </Button>
      <Button
        variant="primaryMedium"
        disabled={!continueEnabled}
        onClick={(e) => {
          e.preventDefault()
          nextBtn?.onClick() ||
            router.push(router.pathname + `?activeTab=${createApiSteps[2]}`)
        }}
      >
        {backBtn?.label || 'Next'}
      </Button>
    </Flex>
  )
}

export default NavButtons