import React, { useState } from 'react'

import { fileList } from '../utils/constant'
import { Tabs, Badge, createStyles, ScrollArea, Center } from '@mantine/core';
import { IconSquareX } from '@tabler/icons'
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
    }
}))



function MainContent() {
    const { classes } = useStyles();
    const [unSaved, setUnsaved] = useState(false)

    const setActiveTab = (id) => {
        console.log(id);
    }
    return (
        <div style={{ height: '100%', width: '100%' }}>
            {/* Tabbar */}
            <Tabs
                activateTabWithKeyboard={false}
                defaultValue={fileList[0].id} onTabChange={setActiveTab} >
                <Tabs.List >
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
                {
                    fileList.map((item) => (
                        <Tabs.Panel key={`${item.id}-panel`} value={item.id} pt="xs">
                            {item.content}
                        </Tabs.Panel>
                    ))
                }
            </Tabs>
            {/* RichTextEditor */}
        </div>
    )
}

export default MainContent