/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Styled } from 'theme-ui'
import Link from 'next/link'
import Stars from './Stars'
import Badge from './Badge'

type CardProps = {
  boxShadowOn?: boolean
  noHover?: boolean
}

const Card = ({boxShadowOn, noHover}: CardProps) => {
  return (
    <div
      className="Card"
      sx={{
        borderRadius: '8px',
        bg: 'white',
        transition: 'transform .2s ease',
        boxShadow: boxShadowOn ? '0px 32px 44px rgba(28, 94, 93, 0.1)': 'none',
        '&:hover': {
          transform: noHover ? 'none' : 'scale(1.05)',
        },
      }}
    >
      <Link href="apis/SOMEAPI">
        <a sx={{ textDecoration: 'none', p: 4 }}>
          <div className="wrap-contents">
            <div sx={{ display: 'block', m: 'auto' }}>
              <img
                className="api-logo"
                src="/images/uniswap.png"
                sx={{
                  width: '140px',
                  height: '140px',
                  display: 'block',
                  m: 'auto',
                }}
              />
            </div>

            <div className="info">
              <div className="row" sx={{ justifyContent: 'space-between' }}>
                <Styled.h3
                  className="title"
                  sx={{
                    textAlign: 'center',
                    my: 2,
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '-0.01em',
                    color: 'black',
                  }}
                >
                  UniswapV2
                </Styled.h3>
                <div
                  className="subtitle"
                  sx={{
                    textAlign: 'center',
                    my: 2,
                    fontFamily: 'Montserrat',
                    fontSize: '14px',
                    lineHeight: '18px',
                    color: 'text',
                    mixBlendMode: 'normal',
                  }}
                >
                  Historical data and analytics for Uniswap V2
                </div>
                <Flex
                  sx={{
                    alignItems: 'center',
                    m: 'auto',
                    justifyContent: 'center',
                    my: 3,
                    mb: 4,
                  }}
                >
                  <Stars count={320} />
                </Flex>
                <Flex sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Badge label="ipfs" />
                </Flex>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card