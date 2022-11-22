import React, { useEffect, useState, useRef } from 'react'

import { Flex, Box, Title, Input, Button } from '@mantine/core'

function SearchFile({ title, onSearchFile }) {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')

    const input = useRef(null)

    const openSearch = () => {
        setInputActive(true)

    }
    const closeSearch = () => {
        setInputActive(false)
        setValue('')
    }

    useEffect(() => {
        if (inputActive) {
            input.current.focus()
        }
    }, [inputActive])

    useEffect(() => {
        const handlerInput = (e) => {
            if (e.keyCode == 13 && inputActive) {
                onSearchFile(value)
            } else if (e.keyCode == 27 && inputActive) {
                // 关闭search，并置空
                closeSearch()
            }
        }
        document.addEventListener('keyup', handlerInput)
        return () => {
            document.removeEventListener('keyup', handlerInput)
        }
    })
    return (
        <div style={{ padding: '10px', height: 50, borderTop: '1px solid rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(0,0,0,0.25)' }}>
            <Box>
                {!inputActive && (
                    <Flex justify={'space-between'} align={'center'}>
                        <Title order={4}>{title}</Title>
                        <Button compact variant='light' onClick={openSearch}>Search</Button>
                    </Flex>
                )}
                {inputActive && (
                    <Flex justify={'space-between'} align={'center'} gap={'5px'}>
                        <Input size='xs' ref={input} value={value} onChange={(e) => setValue(e.target.value)} />
                        <Button compact variant='light' onClick={closeSearch}>Close</Button>
                    </Flex>
                )}
            </Box>
        </div>
    )
}

export default SearchFile