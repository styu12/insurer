import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
const App = () => {
  return <MantineProvider theme={theme}>hello-world</MantineProvider>
}

export default App
