import React, { useEffect, useRef, useState } from 'react'
import { Box, Input, ScrollArea, Stack, Flex, Text, Title, Center, Menu, Button, Modal, createStyles, ActionIcon } from '@mantine/core'
import { IconSearch, IconBrandMedium, IconDotsVertical, IconPlus, IconUpload, IconFolder } from '@tabler/icons'
// uuid
import { v4 as uuidv4 } from 'uuid';

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
    const { fileList, deleteArticle, editArticle, addTabList, addArticle, uploadFile } = rootStore
    // Search
    const [keyword, setKeyword] = useState('')
    const [navShowList, setNavShowList] = useState([])
    // Edit Title
    const inputRef = useRef(null)
    const [editingId, setEditingId] = useState('')
    const [title, setTitle] = useState('')
    // Modal
    const [opened, setOpened] = useState(false)
    const [ModalType, setModalType] = useState('')
    const [newFileTitle, setNewFileTitle] = useState('')
    const [deleteId, setDeleteId] = useState('')
    // location
    const [newFilePath, setNewFilePath] = useState('')

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
    // --------------------------


    // MenuSelect
    const onMenuSelect = ({ type, item }) => {
        if (type === 'delete') {
            setModalType('delete')
            setOpened(true)
            setDeleteId(item.id)
        } else if (type === 'edit') {
            setEditingId(item.id)
            setTitle(item.title)
        }
    }
    // delete article
    const onDeleteConfirm = () => {
        deleteArticle(deleteId)
        setOpened(false)
        setModalType('')
        setDeleteId('')
    }
    // --------------------------

    // edit title
    useEffect(() => {
        if (editingId) {
            inputRef.current.focus()
        }
    }, [editingId])

    const onEditInput = (e) => {
        setTitle(e.target.value);
    }

    const onBlurInput = async (e) => {
        if (!title.trim()) {
            message('warn', 'Please enter a title')
            setTitle('')
            return inputRef.current.focus()
        }
        // 修改title
        await editArticle({ id: editingId, title })
        setEditingId('')
    }
    const onKeyUpInput = (e) => {
        if (e.keyCode === 13) {
            if (!title.trim()) {
                message('warn', 'Please enter a title')
                return setTitle('')
            }
            // 修改title
            editArticle({ id: editingId, title })
            setEditingId('')
        }
    }
    // --------------------------


    // select file
    const onSelectFile = (item) => {
        addTabList(item)
    }
    // --------------------------

    // create new file
    const openModal_NewFile = (e) => {
        e.stopPropagation()
        if (editingId !== '') return message('warn', 'Please finish the title change first')
        // open Modal
        setNewFileTitle('')
        setModalType('newFile')
        setOpened(true)
    }

    const onNewFileEnter = (e) => {
        if (e.keyCode === 13) {
            if (!newFileTitle.trim()) {
                message('warn', 'Please enter a title')
                return setNewFileTitle('')
            }
            createNewFile()
        }
    }
    const onNewFileComfirm = () => {
        if (!newFileTitle.trim()) {
            message('warn', 'Please enter a title')
            return setNewFileTitle('')
        }
        createNewFile()
    }

    const createNewFile = () => {
        const newFile = {
            id: uuidv4(),
            title: newFileTitle,
            content: '',
            unsaved: false,
            latest: new Date().toLocaleString('zh-CN')
        }
        addArticle(newFile)
        addTabList(newFile)
        setOpened(false)
        setModalType('')
    }
    // --------------------------

    // uploadFile
    const uploadHandler = async () => {
        const data = await electron.ipcRenderer.invoke('uploadFile')
        if (data) {
            uploadFile(data);
        }
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
                    onClick={openModal_NewFile}
                >NewFile</Button>
                <Button compact fullWidth variant='outline'
                    leftIcon={<IconUpload size={18} />}
                    onClick={uploadHandler}
                >Upload</Button>
            </Flex>
            {/* Modal */}
            {opened && (
                <Modal
                    centered
                    size="xs"
                    withCloseButton={false}
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={ModalType === 'newFile' ?
                        'New file'
                        : 'Confirm the deletion?'}
                >
                    {(ModalType === 'newFile') ?
                        (<Flex direction={'column'} justify={'space-between'} gap='md'>
                            <Input.Wrapper label="Title" required>
                                <Input data-autofocus value={newFileTitle} size='xs'
                                    onChange={e => setNewFileTitle(e.target.value)}
                                    onKeyUp={onNewFileEnter}
                                    placeholder="Please enter a title for new file" />
                            </Input.Wrapper>
                            <Input.Wrapper label="Path" required>
                                <Flex direction={'row'} gap='sm'>
                                    <Input value={newFilePath} size='xs' sx={{ flexGrow: 1 }} />
                                    <ActionIcon><IconFolder size={26} /></ActionIcon>
                                </Flex>
                            </Input.Wrapper>
                            {/* <Input data-autofocus value={newFileTitle}
                                onChange={e => setNewFileTitle(e.target.value)}
                                onKeyUp={onNewFileEnter}
                            /> */}
                            <Button onClick={onNewFileComfirm}>Create New File</Button>
                        </Flex>)
                        :
                        (
                            <Flex direction={'row'} justify={'space-evenly'}>
                                <Button variant='outline' onClick={() => {
                                    setOpened(false)
                                    setModalType('')
                                    setDeleteId('')
                                }}>Cancel</Button>
                                <Button onClick={onDeleteConfirm}>Confirm</Button>
                            </Flex>
                        )
                    }
                </Modal>
            )}
        </div >
    )
}

export default observer(NavbarContent)