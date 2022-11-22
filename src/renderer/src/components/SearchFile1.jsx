import React, { useEffect, useState, useRef } from 'react'

import { Col, Row, Button, Input } from 'antd'

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
        <div style={{ backgroundColor: 'lightgray' }}>
            {!inputActive &&
                <Row style={{ padding: 10 }}
                    justify="center" align="middle"
                >
                    <Col span={16}>
                        <span>{title}</span>
                    </Col>
                    <Col span={8}>
                        <Button type='primary' size='small'
                            onClick={openSearch}
                        >search</Button>
                    </Col>
                </Row>
            }
            {inputActive &&
                <Row style={{ padding: 10 }}
                    justify="center" align="middle"
                >
                    <Col span={16}
                        style={{ paddingRight: 5 }}
                    >
                        <Input placeholder="search file" size="small" ref={input}
                            value={value} onChange={(e) => setValue(e.target.value)} />
                    </Col>
                    <Col span={8}>
                        <Button type='primary' size='small'
                            onClick={closeSearch}
                        >close</Button>
                    </Col>
                </Row>
            }
        </div>

    )
}

export default SearchFile