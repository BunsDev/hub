/** @jsxImportSource theme-ui **/
import { Grid, Button } from 'theme-ui'
import { useRouter } from 'next/router'
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import Card from './Card'
import { useStateValue } from '../state/state'

type ApiGridProps = {
  apis: APIData[]
  main?: boolean
}

const gridTemplateColumn = 'minmax(300px, 380px)'

const ApiGrid = ({ apis, main }: ApiGridProps) => {
  const [{ search }] = useStateValue()

  const router = useRouter()
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '70vh',
      }}
    >
      {main ? (
        <>
          <Grid
            gap="1rem"
            sx={{
              gridTemplateColumns: [
                `${gridTemplateColumn}`,
                `${gridTemplateColumn} ${gridTemplateColumn}`,
                null,
                `${gridTemplateColumn} ${gridTemplateColumn} ${gridTemplateColumn}`,
                `${gridTemplateColumn} ${gridTemplateColumn} ${gridTemplateColumn} ${gridTemplateColumn}`,
              ],
              mx: 'auto',
            }}
          >
            {search !== undefined && search.sortedApi !== -1 ? (
              <Card api={search.sortedApi[0]} boxShadowOn />
            ) : (
              apis.map((api, idx) => <Card api={api} boxShadowOn key={idx + '-api'} />)
            )}
          </Grid>
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              mb: 4,
            }}
          >
            You reached the end of the list. <b>Don’t stop here!</b>
            <Button
              sx={{ mt: '14px' }}
              variant="primaryMedium"
              onClick={() => {
                router.push('/apis/create?activeTab=start')
              }}
            >
              <span>Create New API</span>
            </Button>
          </div>
        </>
      ) : (
        <Grid
          gap={'3%'}
          sx={{
            gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr'],
            rowGap: ['1%', '2%', '3%', '4%'],
          }}
        >
          {apis.map((api, idx) => (
            <Card
              api={api}
              boxShadowOn
              redirectUrl={'ens/' + api.pointerUris[0]}
              key={idx + '-api'}
            />
          ))}
        </Grid>
      )}
    </div>
  )
}

export default ApiGrid
