
const env = process.env.NODE_ENV;

const server = 'http://3.38.104.97';

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