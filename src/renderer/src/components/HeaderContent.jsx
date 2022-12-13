import React, { useEffect, useState } from 'react'
import { Title, ThemeIcon, Flex, ActionIcon, Modal, Input, Button, Center, Box, Kbd, Table } from '@mantine/core';
import { IconMarkdown, IconSettings, IconFolder, IconKeyboard } from '@tabler/icons'

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'

import message from '../hooks/message'

function HeaderContent() {
    const { folderPath, getDefaultPath, setDefaultPath, resetDefaultPath } = rootStore
    const [opened, setOpened] = useState(false)
    const [keyboard, setKeyboard] = useState(false)

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
            <Flex gap={'md'}>
                <ActionIcon color="dark" variant="transparent"
                    onClick={() => setKeyboard(true)}
                >
                    <IconKeyboard />
                </ActionIcon>
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
                    onClose={() => { }}
                >
                    <Flex direction={'column'} gap='md'>
                        <Center>Defalut File Path Settings</Center>
                        <Flex direction={'row'} gap='sm' align={'center'}>
                            <Input value={folderPath.setPath || folderPath.appPath}
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
            {keyboard && (
                <Modal
                    centered
                    opened={keyboard}
                    withCloseButton={false}
                    onClose={() => setKeyboard(false)}
                    size='88%'
                >
                    <Center sx={{ fontWeight: 700 }}>Keyboard Shortcuts</Center>
                    <Flex direction={'row'} gap='lg'>
                        <Flex sx={{ width: '50%' }}>
                            <Table>
                                <thead><tr><th colSpan={'2'}>
                                    <Center>Writing</Center>
                                </th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>B</Kbd></td>
                                        <td>Bold</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>I</Kbd></td>
                                        <td>Italic</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>H</Kbd></td>
                                        <td>Heading</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>'</Kbd></td>
                                        <td>Quote</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>L</Kbd></td>
                                        <td>DeleteLine</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>D</Kbd></td>
                                        <td>Generic List</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>L</Kbd></td>
                                        <td>Numbered List</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd></td>
                                        <td>Create Link</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>I</Kbd></td>
                                        <td>Insert Image</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>C</Kbd></td>
                                        <td>Code Fragments or Code Blocks</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>[</Kbd>/ <Kbd>]</Kbd></td>
                                        <td>IndentLess or IndentMore</td>
                                    </tr>
                                </tbody>
                            </Table>
                            {/* <Center>Writing</Center> */}
                        </Flex>
                        <Flex sx={{ width: '50%' }} direction={'column'} justify={'space-between'}>
                            <Table>
                                <thead><tr><th colSpan={'2'}>
                                    <Center>General</Center>
                                </th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>A</Kbd></td>
                                        <td>SelectAll</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>S</Kbd></td>
                                        <td>Save</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd></td>
                                        <td>Undo</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>X</Kbd></td>
                                        <td>Cut</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>C</Kbd></td>
                                        <td>Copy</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>V</Kbd></td>
                                        <td>Paste</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table>
                                <thead><tr><th colSpan={'2'}>
                                    <Center>Manipulation</Center>
                                </th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td><Kbd>Ctrl</Kbd> + <Kbd>P</Kbd></td>
                                        <td>Toggle Preview</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>F9</Kbd></td>
                                        <td>Toggle Side by Side</td>
                                    </tr>
                                    <tr>
                                        <td><Kbd>F11</Kbd></td>
                                        <td>Toogle Fullscreen</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Flex>
                    </Flex>
                </Modal>
            )}
        </Flex>
    )
}

export default observer(HeaderContent)