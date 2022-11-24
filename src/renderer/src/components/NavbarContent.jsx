import React, { useEffect, useRef, useState } from 'react'
import { Box, Input, ScrollArea, Stack, Flex, Text, Title, Center, Menu, Button, createStyles } from '@mantine/core'
import { IconSearch, IconBrandMedium, IconDotsVertical, IconPlus, IconUpload } from '@tabler/icons'

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'


// message
import message from '../hooks/message'
// 自定义hover样式
const useStyles = createStyles((theme, _params, getRef) => ({
    item: {
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: theme.colors.gray[1]
        }
    },
    menu: {
        borderRadius: '5px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.1)',
        }
    }
}))


function NavbarContent() {
    const { classes } = useStyles()
    const { fileList, deleteArticle, editArticle } = rootStore
    const [keyword, setKeyword] = useState('')
    const [navShowList, setNavShowList] = useState([])
    const inputRef = useRef(null)
    const [editingId, setEditingId] = useState('')
    const [title, setTitle] = useState('')

    // search
    const onInputHandler = (e) => {
        setKeyword(e.target.value)
    }

    useEffect(() => {
        if (keyword) {
            setNavShowList(fileList.filter(item => item.title.includes(keyword)))
        } else {
            setNavShowList(fileList)
        }
    }, [keyword, fileList])


    // MenuSelect
    const onMenuSelect = ({ type, item }) => {
        if (type === 'delete') {
            deleteArticle(item.id)
        } else if (type === 'edit') {
            setEditingId(item.id)
            setTitle(item.title)
        }
    }

    useEffect(() => {
        if (editingId) {
            inputRef.current.focus()
        }
    }, [editingId])

    // edit title
    const onEditInput = (e) => {
        setTitle(e.target.value);
    }

    const onBlurInput = (e) => {
        if (!title) return message('warn', 'Please enter a title')
        // 修改title
        editArticle({ id: editingId, title })
        setEditingId('')
    }
    const onKeyUpInput = (e) => {
        if (e.keyCode === 13) {
            if (!title) return message('warn', 'Please enter a title')
            // 修改title
            editArticle({ id: editingId, title })
            setEditingId('')
        }
    }


    // select file
    const onSelectFile = ({ id, title }) => {
        console.log({ id, title })
    }


    return (
        <div style={{ height: '100%' }}>
            {/* search */}
            <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Input icon={<IconSearch size={18} />} variant='unstyled' placeholder='Search...'
                    onChange={onInputHandler}
                />
            </Box>
            {/* list */}
            <Box style={{ height: 'calc(100% - 120px)', paddingTop: 5 }}>
                <ScrollArea style={{ height: '97%' }} scrollbarSize={5}>
                    <Stack spacing='8px' sx={{ paddingRight: '5px' }}>
                        {navShowList.map((item) =>
                        (
                            <Flex key={item.id} justify={'space-between'} align={'center'} py='6px' gap={'2px'} className={classes.item}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onSelectFile(item)
                                }}
                            >
                                {/* 图标、标题 */}
                                {(editingId !== item.id) && (
                                    <Flex gap={'5px'} align={'center'} >
                                        <Center><IconBrandMedium size={32} /></Center>
                                        <Stack spacing={0} >
                                            <Title order={6} size={13}>
                                                <Text lineClamp={2}>{item.title}</Text>
                                            </Title>
                                            <Text fz="xs">{item.latest}</Text>
                                        </Stack>
                                    </Flex>
                                )}
                                {/* Input */}
                                {(editingId === item.id) && (
                                    <Box sx={{ paddingLeft: '5px' }} onClick={(e) => e.stopPropagation()}>
                                        <Input ref={inputRef} value={title}
                                            onChange={onEditInput}
                                            onBlur={onBlurInput}
                                            onKeyUp={onKeyUpInput}
                                        />
                                    </Box>
                                )}
                                {/* menu */}
                                <Box justify={'center'} align={'center'} className={classes.menu}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Menu >
                                        <Menu.Target>
                                            <Center><IconDotsVertical size={16} /></Center>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item onClick={() => {
                                                onMenuSelect({ type: 'edit', item })
                                            }}>Edit</Menu.Item>
                                            <Menu.Item onClick={() => {
                                                onMenuSelect({ type: 'delete', item })
                                            }}>Delete</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Box>
                            </Flex>
                        )
                        )}
                    </Stack>
                </ScrollArea>
            </Box>
            {/* buttons */}
            <Flex gap='xs' justify={'center'}>
                <Button compact fullWidth variant='outline'
                    leftIcon={<IconPlus size={18} />}
                    onClick={(e) => {
                        e.stopPropagation()
                        console.log('NewFile');
                    }}
                >NewFile</Button>
                <Button compact fullWidth variant='outline'
                    leftIcon={<IconUpload size={18} />}
                    onClick={(e) => {
                        e.stopPropagation()
                        console.log('Upload');
                    }}
                >Upload</Button>
            </Flex>
        </div >
    )
}

export default observer(NavbarContent)