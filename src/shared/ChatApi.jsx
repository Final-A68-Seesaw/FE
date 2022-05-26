
const server = 'https://walbu.shop'

const sockUrl = server + '/ws-seesaw'
const sockUrls = server + '/wss-seesaw'

const sendUrl = '/pub/mainchat'

const subscribeUrl = '/topic/mainchat'

const getChat = server + '/mainchat/get/main'

const ChatUrls = {
  server,
  sockUrl,
  sockUrls,
  sendUrl,
  subscribeUrl,
  getChat,
}

export { ChatUrls }

export default server