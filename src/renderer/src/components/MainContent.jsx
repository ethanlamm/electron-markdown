import React, { useState } from 'react'

import { fileList } from '../utils/constant'
import { Tabs, Badge, createStyles, Box, Center, Stack } from '@mantine/core';
import { IconSquareX } from '@tabler/icons'

import RichTextEditorCom from './RichTextEditorCom';

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
    const { classes } = useStyles();
    const [unSaved, setUnsaved] = useState(false)

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Stack spacing={'xs'}>
                {/* Tabbar */}
                <Tabs
                    variant="pills"
                    keepMounted={false}
                    activateTabWithKeyboard={false}
                    defaultValue={fileList[0].id}
                    onTabChange={() => { }}
                >
                    <Tabs.List className={classes.tablist}>
                        {fileList.map(item => (
                            <Tabs.Tab
                                key={item.id}
                                className={classes.tab}
                                value={item.id}
                                icon={unSaved && (
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
                                            console.log('close', item.id)
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
            </Stack>
        </div>
    )
}

export default MainContent