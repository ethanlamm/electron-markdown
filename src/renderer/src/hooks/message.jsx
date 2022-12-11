import ReactDOM from 'react-dom/client'
import { Notification, Box } from '@mantine/core';
import { IconCheck, IconX, IconAlertTriangle } from '@tabler/icons';


const domContainer = document.createElement('div')
domContainer.setAttribute('id', 'message-container')
document.body.appendChild(domContainer)


const NotificationCom = ({ type, text }) => {
    const icons = {
        success: <IconCheck size={20} />,
        warn: <IconAlertTriangle size={20} />,
        error: <IconX size={20} />
    }
    const colors = {
        success: 'green',
        warn: 'yellow',
        error: 'red'
    }

    return (
        <Box sx={{ position: 'fixed', zIndex: 999, top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            <Notification icon={icons[type]} title={text} color={colors[type]} disallowClose></Notification>
        </Box>
    )
}


let timer = null

const root = ReactDOM.createRoot(domContainer)
/**
 *  消息函数
 * @param {String} type 消息类型 warn 警告  error 错误  success 成功
 * @param {String} text 消息文字
 * @param {number} time 消息提示时间 默认 3000
 */
function message(type, text, time = 3000) {
    root.render(<NotificationCom type={type} text={text} />)
    clearTimeout(timer)
    timer = setTimeout(() => {
        root.render(null)
    }, time)
}

export default message