import buttonVariants from './theme/buttons'
import type { Theme } from '@theme-ui/css/dist/declarations/src/types'

export const timing = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3]

const GlobalTheme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Nunito Sans", sans-serif',
    heading: '"Nunito Sans", sans-serif',
    monospace: '"Nunito Sans", monospace',
    button: '"Nunito Sans", sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 800,
    bold: 700,
  },
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
  colors: {
    background: '#EEE',
    text: '#FFF',

    w3green: '#509DAC',
    w3darkGreen: '#0D373C',
    w3beige: '#688184',
    w3darkGray: '#141A1E',
    w3Grey1: '#141417',
    w3Grey3: '#1F1F20',

    w3shade0: '#12191E',
    w3shade1: '#13212C',
    w3shade2: '#1B2731',
    w3shade3: '#1F3A46',

    w3greenGradient: 'linear-gradient(0deg, #529DAD 1.85%, #60C092 97.11%)',
    w3hazeGradient: 'linear-gradient(180deg, #FFFFFF 0%, #E1ECEA 100%)',

    w3ButtonPrimary: '#1B5FED',
    w3ButtonPrimaryHover: '#008EE9',
    w3ButtonSecondary: 'rgba(255, 255, 255, 0.2)',
    w3TextNavTeal: '#4A7A84',

    w3NavHighlightTeal: '#243843',
    w3NavNeonHighlightTeal: '#66E0D9',
    w3NavGrayGreen: '#1B262C',

    w3NavPink: 'rgb(236, 70, 126)',
    w3NavPinkBg: 'rgba(236, 70, 126, 0.2)',
    w3NavGreen: 'rgb(0, 195, 113)',
    w3NavGreenBg: 'rgba(0, 195, 113, 0.2)',
    w3NavYellow: 'rgb(255, 206, 0)',
    w3NavYellowBg: 'rgba(255, 206, 0, 0.2)',
    w3NavBlue: '#008EE9',
    w3NavBlueBg: '#008EE934',

    w3PlayGroundNavy: '#13212C',
    w3PlaygroundSoftBlue: '#B2D2D9',

    w3OffWhite: '#E9E9E9',

    cardBg: 'rgba(0, 0, 0, 0.8)',

    unknownHEX0: '#CAD9F3',
    unknownHEX1: '#EFF5F4',
    unknownHEX2: '#DDDDDD',
    unknownHEX3: '#597980',
    unknownHEX4: '#598188',
    unknownHEX5: '#86909F',
    unknownHEX6: '#FCFDFD',
    unknownHEX7: '#ECF4F2',

    unknownRGBA0: 'rgba(28, 94, 93, 0.1)',
    unknownRGBA1: 'rgba(104,129,132,.1)',
    unknownRGBA2: 'rgba(0,0,0,.4)',
    unknownRGBA3: 'rgba(0, 0, 0, 0.06)',
    unknownRGBA4: 'rgba(104,129,132,.5)',
    unknownRGBA5: 'rgba(20, 102, 204, 0.16)',
  },
  forms: {
    select: {
      bg: 'transparent',
      border: '2px solid rgba(205, 208, 227, 0.295455)',
      cursor: 'pointer',
      borderRadius: '8px',
      dark: {
        border: '2px solid',
        color: 'white',
        borderColor: 'rgba(202,217,243, .3)',
      },
    },
    input: {
      border: '2px solid rgba(205, 208, 227, 0.295455)',
    },
    label: {
      fontFamily: 'Nunito Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '120%',
      color: 'rgba(255, 255, 255, .5)',
      mb:'.25rem'
    },
  },
  buttons: {
    ...buttonVariants,
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h2: {
      marginTop: '0',
      color: '#FFF',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: '28px',
    },
    h3: {
      m: 0,
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: '20px',
    },
    h4: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      marginTop: '0',
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
    },
    img: {
      maxWidth: '100%',
    },
  },
}

export default GlobalTheme
