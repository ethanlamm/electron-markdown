import React from 'react'
import { AppShell, Navbar, Header } from '@mantine/core';

import NavbarContent from './NavbarContent'
import MainContent from './MainContent'
import HeaderContent from './HeaderContent';

// Mousetrap
import Mousetrap from 'mousetrap'

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'

function Layout() {
    const { NavbarShow, updateNavbar } = rootStore

    Mousetrap.bind('ctrl+n', function () {
        updateNavbar(!NavbarShow)
    })

    return (
        <AppShell
            zIndex={7}
            padding="md"
            navbar={NavbarShow && (
                <Navbar width={{ base: 220 }} height={'100%'} p="xs" >
                    {<NavbarContent />}
                </Navbar>
            )}
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

export default observer(Layout)