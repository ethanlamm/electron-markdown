import React, { useEffect, useRef, useState } from 'react'
import { Box, Input, ScrollArea, Stack, Flex, Text, Title, Center, Menu, Button, Modal, createStyles, ActionIcon } from '@mantine/core'
import { IconSearch, IconBrandMedium, IconDotsVertical, IconPlus, IconUpload, IconFolder } from '@tabler/icons'

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'


// message
import message from '../hooks/message'

// 自定义hover样式
const useStyles = createStyles((theme, _params, getRef) => ({
    item: {
        cursor: 'pointer',
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: 'rgba(34, 139, 230,0.1)'
        }
    },
    activeItme: {
        backgroundColor: 'rgba(34, 139, 230,0.1)'
    },
    menu: {
        borderRadius: '5px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(34, 139, 230,0.2)'
        }
    }
}))


function NavbarContent() {
    const { classes } = useStyles()
    const { fileList, folderPath, idStatus, removeDeleteFile, editFileTitle, addTabList, uploadFile, createFile, setNewFilePath } = rootStore
    // Search
    const [keyword, setKeyword] = useState('')
    const [navShowList, setNavShowList] = useState([])
    // Edit Title
    const inputRef = useRef(null)
    const [editingId, setEditingId] = useState('')
    const [title, setTitle] = useState('')
    // remove/deleteFile-Modal
    const [remove_delete_Modal, setRemoveDeleteModal] = useState(false)
    const [ModalType, setModalType] = useState('')
    const [remove_delete_id, setRemoveDeleteId] = useState('')
    // newFile-Modal
    const [newFileModal, setNewFileModal] = useState(false)
    const [newFileTitle, setNewFileTitle] = useState('')

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
        switch (type) {
            case 'edit':
                setEditingId(item.id)
                setTitle(item.title)
                break
            case 'remove':
                setModalType('remove')
                setRemoveDeleteModal(true)
                setRemoveDeleteId(item.id)
                break
            case 'delete':
                setModalType('delete')
                setRemoveDeleteModal(true)
                setRemoveDeleteId(item.id)
                break
            default:
                break;
        }
    }
    // remove file from App
    const onRemoveConfirm = () => {
        removeDeleteFile({ id: remove_delete_id })
        setRemoveDeleteModal(false)
        setModalType('')
        setRemoveDeleteId('')
    }
    // delete file from Local System
    const onDeleteConfirm = async () => {
        const result = await removeDeleteFile({ id: remove_delete_id, localSystem: true })
        if (result === 'success') {
            message('success', 'successfully Delete from local system')
            setRemoveDeleteModal(false)
            setModalType('')
            setRemoveDeleteId('')
        }
    }
    // --------------------------

    // edit title
    useEffect(() => {
        if (editingId) {
            inputRef.current.focus()
        }
    }, [editingId])
    // input: 受控组件
    const onEditInput = (e) => {
        setTitle(e.target.value);
    }
    // input-blur
    const onBlurInput = () => {
        if (!title.trim()) {
            message('warn', 'The title cannot be empty')
            setTitle('')
            return inputRef.current.focus()
        }
        // 修改title
        editTitleHandler()
    }
    // input-enter
    const onKeyUpInput = (e) => {
        if (e.keyCode === 13) {
            if (!title.trim()) {
                message('warn', 'The title cannot be empty')
                return setTitle('')
            }
            // 修改title
            editTitleHandler()
        }
    }
    // editTitleHandler
    const editTitleHandler = async () => {
        const result = await editFileTitle({ id: editingId, title })
        if (result === 'sameName') {
            message('warn', 'A file with the same name exists', 4000)
            setTitle('')
            return inputRef.current.focus()
        }
        setEditingId('')
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
        setNewFileModal(true)
    }
    // input-enter
    const onNewFileEnter = (e) => {
        if (e.keyCode === 13) {
            if (!newFileTitle.trim()) {
                message('warn', 'The title cannot be empty')
                return setNewFileTitle('')
            }
            createNewFile()
        }
    }
    // comfirm
    const onNewFileComfirm = () => {
        if (!newFileTitle.trim()) {
            message('warn', 'The title cannot be empty')
            return setNewFileTitle('')
        }
        createNewFile()
    }
    // createNewFileHandler
    const createNewFile = async () => {
        const result = await createFile(newFileTitle)
        if (result === 'sameName') {
            message('warn', 'A file with the same name exists', 4000)
            return setNewFileTitle('')
        }
        setNewFileModal(false)
    }
    // --------------------------

    // uploadFile
    const uploadHandler = () => {
        uploadFile()
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
                            <Flex key={item.id} justify={'space-between'} align={'center'} py='6px' gap={'2px'} className={[classes.item, item.id === idStatus.activeId ? classes.activeItme : '']} sx={{ paddingRight: '5px' }}
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
                                            }}>Edit Title</Menu.Item>
                                            <Menu.Item onClick={() => {
                                                onMenuSelect({ type: 'remove', item })
                                            }}>Remove From App</Menu.Item>
                                            <Menu.Item onClick={() => {
                                                onMenuSelect({ type: 'delete', item })
                                            }}>Delete From System</Menu.Item>
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
            {/* newFileModal */}
            {newFileModal && (
                <Modal
                    centered
                    size="sm"
                    withCloseButton={false}
                    opened={newFileModal}
                    onClose={() => setNewFileModal(false)}
                >
                    <Flex direction={'column'} justify={'space-between'} gap='md'>
                        <Center>Create a New file</Center>
                        <Input.Wrapper label="Title" required>
                            <Input data-autofocus value={newFileTitle} size='xs'
                                onChange={e => setNewFileTitle(e.target.value)}
                                onKeyUp={onNewFileEnter}
                                placeholder="Type a Title..." />
                        </Input.Wrapper>
                        <Input.Wrapper label="Path">
                            <Flex direction={'row'} gap='xs'>
                                <Input value={folderPath.newFilePath || folderPath.setPath || folderPath.appPath} size='xs' sx={{ flexGrow: 1 }} readOnly />
                                <ActionIcon onClick={setNewFilePath}><IconFolder size={26} /></ActionIcon>
                            </Flex>
                        </Input.Wrapper>
                        <Button onClick={onNewFileComfirm}>Create</Button>
                    </Flex>
                </Modal>
            )}
            {/* remove_delete_Modal */}
            {remove_delete_Modal && (
                <Modal
                    centered
                    size="sm"
                    withCloseButton={false}
                    opened={remove_delete_Modal}
                    onClose={() => setRemoveDeleteModal(false)}
                    title={ModalType === 'remove' ? 'Are you sure you want to remove the file from application?' : 'Are you sure you want to delete the file from local system?'}
                >
                    {ModalType === 'remove' ? (
                        <Flex direction={'column'} gap='sm'>
                            <Text sx={{ fontSize: '14px' }}>You can re-upload the file from the Local System.</Text>
                            <Flex direction={'row'} justify={'space-evenly'}>
                                <Button variant='outline' onClick={() => {
                                    setRemoveDeleteModal(false)
                                    setModalType('')
                                    setRemoveDeleteId('')
                                }}>Cancel</Button>
                                <Button onClick={onRemoveConfirm}>Remove</Button>
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex direction={'column'} gap='sm'>
                            <Text sx={{ fontSize: '14px' }}>You can restore the file from the Recycle Bin.</Text>
                            <Flex direction={'row'} justify={'space-evenly'}>
                                <Button variant='outline' onClick={() => {
                                    setRemoveDeleteModal(false)
                                    setModalType('')
                                    setRemoveDeleteId('')
                                }}>Cancel</Button>
                                <Button onClick={onDeleteConfirm}>Delete</Button>
                            </Flex>
                        </Flex>
                    )}
                </Modal>
            )}
        </div >
    )
}

export default observer(NavbarContent)