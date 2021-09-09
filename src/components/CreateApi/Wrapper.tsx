/** @jsxImportSource theme-ui **/

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    sx={{
      mt: '3.125rem',
      '.inputwrap': {
        width: '30.6875rem',
      },
    }}
  >
    {children}
  </div>
)
