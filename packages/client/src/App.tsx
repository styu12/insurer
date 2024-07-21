import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { AppShell, Burger, Group, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { theme } from './theme'

const App = () => {
  const [opened, { toggle }] = useDisclosure()
  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

export default App
