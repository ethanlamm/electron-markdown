import React, { useEffect, useState } from 'react'
import { Title, ThemeIcon, Flex, ActionIcon, Modal, Input, Button } from '@mantine/core';
import { IconMarkdown, IconSettings, IconFolder } from '@tabler/icons'

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'

import message from '../hooks/message'

function HeaderContent() {
    const { defaultPath, getDefaultPath, setDefaultPath, resetDefaultPath } = rootStore
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        getDefaultPath()
    }, [])

    const setDefaultPathHandler = () => {
        setDefaultPath()
    }

    const reset = () => {
        resetDefaultPath()
        message('success', 'Reset successfully')
        setOpened(false)
    }

    return (
        <Flex direction={'row'} align={'center'} justify={'space-between'}>
            <Flex align={'center'} gap='xs'>
                <ThemeIcon color={'dark'}><IconMarkdown /></ThemeIcon>
                <Title order={3}>Markdown</Title>
            </Flex>
            <Flex>
                <ActionIcon color="dark" variant="transparent"
                    onClick={() => setOpened(true)}
                >
                    <IconSettings />
                </ActionIcon>
            </Flex>
            {opened && (
                <Modal
                    centered
                    opened={opened}
                    withCloseButton={false}
                    title='Defalut File Path Settings'
                >
                    <Flex direction={'column'} gap='md'>
                        <Flex direction={'row'} gap='sm' align={'center'}>
                            <Input value={defaultPath.setPath || defaultPath.appPath}
                                sx={{ flexGrow: 1 }} readOnly
                            />
                            <ActionIcon onClick={setDefaultPathHandler}><IconFolder size={30} /></ActionIcon>
                        </Flex>
                        <Flex direction={'row'} justify={'space-evenly'}>
                            <Button variant='outline' size='sm' onClick={reset}>Reset</Button>
                            <Button onClick={() => setOpened(false)}>Set</Button>
                        </Flex>
                    </Flex>
                </Modal>
            )}
        </Flex>
    )
}

export default observer(HeaderContent)