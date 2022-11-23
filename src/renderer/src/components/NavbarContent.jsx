import React from 'react'
import { Box, Input, ScrollArea, Stack, Flex, Text, Title, Center, Menu, Button } from '@mantine/core'
import { IconSearch, IconBrandMedium, IconDotsVertical, IconPlus, IconUpload } from '@tabler/icons'


function NavbarContent({ onInputHandler, onSelectFile, onMenuSelect }) {
   
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
                <ScrollArea style={{ height: '97%' }} scrollbarSize={4}>
                    <Stack spacing='8px' sx={{ paddingRight: '7px' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) =>
                        (
                            <Flex key={index} justify={'space-between'} align={'center'} py='6px' gap={'5px'}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onSelectFile(item)
                                }}
                            >
                                {/* 图标、标题 */}
                                <Flex gap={'5px'} align={'center'}>
                                    <Center><IconBrandMedium size={32} /></Center>
                                    <Center>
                                        <Title order={6} size={14}>
                                            <Text lineClamp={1}>我的文档{item}</Text>
                                        </Title>
                                    </Center>
                                </Flex>
                                {/* menu */}
                                <Box justify={'center'} align={'center'}
                                    sx={{cursor:'pointer'}}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Menu >
                                        <Menu.Target>
                                            <Center style={{ width: 22, height: 22 }}><IconDotsVertical size={16} /></Center>
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

export default NavbarContent