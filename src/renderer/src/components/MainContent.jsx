import React, { useEffect, useState } from 'react'

import { Tabs, Badge, createStyles, Box, Center, Stack, Flex, Modal, Button, Text } from '@mantine/core';
import { IconSquareX, IconMarkdown } from '@tabler/icons'

import RichTextEditorCom from './RichTextEditorCom';

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'

// 自定义样式hover
const useStyles = createStyles((theme, _params, getRef) => ({
    tab: {
        '&:hover': {
            [`& .${getRef('close')}`]: {
                visibility: 'visible'
            }
        },
    },
    close: {
        ref: getRef('close'),
        visibility: 'hidden',
    },

    tablist: {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '3px',
        '&::-webkit-scrollbar': {
            visibility: 'hidden',
            height: '6px',
        },
        '&:hover': {
            '&::-webkit-scrollbar': {
                visibility: 'visible',
                height: '6px',
                '&-thumb': {
                    borderRadius: '3px',
                    backgroundColor: '#999999'
                }
            },
        }

    }
}))


function MainContent() {
    const { tabList, idStatus, unsavedList, updateIdStatus, removeTab, removeUnsaved, writeFile } = rootStore
    const { classes } = useStyles();
    const [tabActiveId, setTabActiveId] = useState('')
    // Modal
    const [opened, setOpened] = useState(false);
    const [closeId, setClodeId] = useState('')

    // tab select
    useEffect(() => {
        if (idStatus.activeId) {
            setTabActiveId(idStatus.activeId)
        }
    }, [idStatus.activeId])

    const onTabChangeHandler = (value) => {
        updateIdStatus(value)
        setTabActiveId(value)
    }

    // close tab
    const closeTab = (id) => {
        setClodeId(id)
        const isUnsaved = unsavedList.includes(id)
        if (isUnsaved) {
            // 修改了，询问是否保存
            setOpened(true)
        } else {
            // 没有修改，直接关闭
            removeTab(id)
        }
    }

    // 不保存
    const unsaveHandler = () => {
        // 移除unsavedList
        removeUnsaved(closeId)
        // 移除tabList
        removeTab(closeId)
        // 关闭Moadl
        setOpened(false)
        // 重置closeId
        setClodeId('')
    }

    // 保存
    const saveHandler = () => {
        // 修改
        writeFile(closeId)
        // 移除tabList
        removeTab(closeId)
        // 关闭Moadl
        setOpened(false)
        // 重置closeId
        setClodeId('')
    }
    return (
        <div style={{ height: '100%', width: '100%' }}>
            {tabList.length !== 0 ?
                (<Stack spacing={'xs'} sx={{ height: '100%', width: '100%' }}>
                    {/* Tabbar */}
                    <Tabs
                        variant="pills"
                        keepMounted={false}
                        activateTabWithKeyboard={false}
                        value={tabActiveId}
                        onTabChange={onTabChangeHandler}
                    >
                        <Tabs.List className={classes.tablist}>
                            {tabList.map(item => (
                                <Tabs.Tab
                                    key={item.id}
                                    className={classes.tab}
                                    value={item.id}
                                    icon={
                                        (unsavedList.includes(item.id)) && (
                                            <Badge
                                                sx={{ width: 14, height: 14, pointerEvents: 'none' }}
                                                color='red.3'
                                                variant="filled"
                                                size="xs"
                                                p={0}
                                            ></Badge>
                                        )}
                                    rightSection={
                                        <Center className={classes.close}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                closeTab(item.id)
                                            }}>
                                            <IconSquareX size={19} />
                                        </Center>
                                    }
                                >{item.title}</Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs>
                    {/* RichTextEditor */}
                    <Box sx={{ flexGrow: 1 }}>
                        <RichTextEditorCom />
                    </Box>
                </Stack>)
                : (<Flex sx={{ height: '100%', width: '100%' }} justify={'center'} align={'center'}><IconMarkdown size={80} /></Flex>)
            }
            {opened && (
                <Modal
                    centered
                    size="sm"
                    withCloseButton={false}
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Do you want to save the changes you made to the file?"
                >
                    <Flex direction={'column'} gap='sm'>
                        <Text sx={{ fontSize: '14px' }}>Your changes will be lost if you dont't save them</Text>
                        <Flex direction={'row'} justify={'space-evenly'}>
                            <Button variant='outline' onClick={unsaveHandler}>Don't Save</Button>
                            <Button onClick={saveHandler}>Save</Button>
                        </Flex>
                    </Flex>
                </Modal>
            )}
        </div>
    )
}

export default observer(MainContent)