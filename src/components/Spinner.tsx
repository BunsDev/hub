/** @jsxImportSource theme-ui **/
import { ThemeUIStyleObject } from '@theme-ui/css'
import React from 'react'

const Spinner = ({ size }: { size?: 'small' }) => {
  const style: ThemeUIStyleObject =
    size === 'small' ? { width: '10px', height: '10px' } : {}
  return (
    <img src="/images/spinner.gif" alt="loading" sx={{ userSelect: 'none', ...style }} />
  )
}

export default React.memo(Spinner)
