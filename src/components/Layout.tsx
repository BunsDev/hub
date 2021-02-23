/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Global } from '@emotion/core'
import Header from './Header'
type LayoutProps = {
  children?: any
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="layout"
      sx={{
        maxWidth: '1440px',
        margin: 'auto',
        padding: '0 1rem',
        '&::before, &::after': {
          display: 'none',
        },
      }}
    >
      <Header />
      {children}
      <br/><br/><br/>
      <Global
        styles={(theme) => ({
          '*': {
            boxSizing: 'border-box',
            position: 'relative',
            '*::before, *::after': {
              boxSizing: 'border-box',
              position: 'relative',
            },
          },
          html: {
            scrollBehavior: 'smooth',
            fontSize: '100%',
            WebkitTextSizeAdjust: '100%',
            fontVariantLigatures: 'none',
            WebkitFontVariantLigatures: 'none',
            textRendering: 'optimizeLegibility',
            MozOsxFontSmoothing: 'grayscale',
            fontSmoothing: 'antialiased',
            WebkitFontSmoothing: 'antialiased',
            textShadow: 'rgba(0, 0, 0, 0.01) 0 0 1px',
            '&::before, &::after': {
              display: 'none',
            },
          },
          body: {
            scrollBehavior: 'smooth',
            margin: '0',
            padding: '0',
            overflowX: 'hidden',
            overflowY: 'scroll !important',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            backgroundAttachment: 'scroll',
          },
          'ul, ol, li': {
            margin: '0',
            padding: '0',
            listStyle: 'none',
          },
          'a, Button, [type="Button"], [type="reset"], [type="submit"], [type="file"], [type="file"]::-webkit-file-upload-Button': {
            textTransform: 'none',
            appearance: 'none',
            cursor: 'pointer',
          },
          'h1, h2, h3, h4, h5, h6, p': {
            marginTop: '0',
          },
          'img, svg, picture, span, a, b, u, i, small, sub, strong, label': {
            display: 'inline-block',
          },
          'table, thead, tbody, tfoot, tr, td, th': {
            borderSpacing: '0',
            borderCollapse: 'collapse',
            textAlign: 'left',
          },
          'table tbody tr:nth-of-type(even)': {
            background: 'rgba(255, 255, 255, 0.04)',
          },
          'table tbody tr:hover': {
            background: 'rgba(255, 255, 255, 0.08)',
          },
          main: {
            margin: 'auto',
            maxWidth: '1200px'
          },
          pre: {
            border: '1px solid black',
            padding: '1rem',
          },
          fieldset: {
            border: 'none',
            padding: '0',
            margin: '0'
          },
          'input,select,pre,code': {
            backgroundColor: 'white !important'
          },
          '.callout-text': {
            background: '#DDD',
            padding: '1rem',
            textAlign: 'center',
          }
        })}
      />
      <style jsx global>{`
        /* Typescript weirdness */
        body::before,
        body::after {
          display: none;
          zindex: -1;
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          backgroundattachment: scroll;
        }
      `}</style>
    </div>
  )
}
export default Layout