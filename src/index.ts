import WebSocket from 'websocket'
import MegaphoneMessage from './Model/MegaphoneMessage'

const client = new WebSocket.client()

function atob(str: string): string {
  return Buffer.from(str, 'base64').toString('utf8')
}

client.on('connect', connection => {
  console.log('Connected')

  connection.on('close', () => {
    console.log('Closed')
  })

  connection.on('message', data => {
    if (data.type === 'utf8') {
      let splittedData = (data.utf8Data || '').split('#')

      if (splittedData.length === 0) {
        return
      }

      let message = {
        'type': splittedData[0],
        'body': splittedData[1]
      }

      if (message.type === 'new_megaphone') {
        let megaphoneMessages = JSON.parse(atob(message.body)) as MegaphoneMessage[]
        for (let message of megaphoneMessages) {
          // do something
        }
      }
    }
  })
})

client.connect('wss://ws.arad-megaphone-log.tk/')
