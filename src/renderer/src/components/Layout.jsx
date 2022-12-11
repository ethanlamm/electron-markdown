import React from 'react'
import { AppShell, Navbar, Header } from '@mantine/core';

import NavbarContent from './NavbarContent'
import MainContent from './MainContent'
import HeaderContent from './HeaderContent';

function Layout() {
    return (
        <AppShell
            zIndex={7}
            padding="md"
            navbar={<Navbar width={{ base: 220 }} height={'100%'} p="xs" >
                {<NavbarContent />}
            </Navbar>}
            header={<Header height={{ base: 50 }} p="xs">
                {<HeaderContent />}
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