import React from 'react'
import { AppShell, Navbar, Header, Title, ThemeIcon, Flex } from '@mantine/core';
import { IconMarkdown } from '@tabler/icons'

import NavbarContent from './NavbarContent'
import MainContent from './MainContent'
function Layout() {
    return (
        <AppShell
            zIndex={7}
            padding="md"
            navbar={<Navbar width={{ base: 220 }} height={'100%'} p="xs" >
                {<NavbarContent />}
            </Navbar>}
            header={<Header height={{ base: 50 }} p="xs">
                {<Flex direction={'row'} align={'center'} gap='xs'>
                    <ThemeIcon color={'dark'}><IconMarkdown /></ThemeIcon>
                    <Title order={3}>Markdown</Title>
                </Flex>}
            </Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {<MainContent />}
        </AppShell>
    )
}

export default Layout