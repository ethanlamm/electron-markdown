import React from 'react'
import { AppShell, Navbar, Header, Title, ThemeIcon, Flex } from '@mantine/core';
import { IconMarkdown } from '@tabler/icons'

import NavbarContent from './NavbarContent'
import MainContent from './MainContent'
function Layout() {
    const onInputHandler = (e) => {
        console.log('input',e.target.value);
    }
    const onSelectFile = (item) => {
        console.log('selectFile',item);
    }
    const selectTab = (id) => {
        console.log('selectTab',id);
    }
    const onMenuSelect = (data) => {
        console.log(data);
    }
    return (
        <AppShell
            zIndex={7}
            padding="md"
            navbar={<Navbar width={{ base: 210 }} height={'100%'} p="xs" >
                {<NavbarContent onInputHandler={onInputHandler} onSelectFile={onSelectFile} onMenuSelect={onMenuSelect} />}
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
            {<MainContent selectTab={selectTab}  />}
        </AppShell>
    )
}

export default Layout