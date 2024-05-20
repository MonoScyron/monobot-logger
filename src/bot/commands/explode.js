const { createCanvas, loadImage } = require('canvas')
const GIFEncoder = require('gifencoder')
const { CANVAS_SIZE } = require('../utils/constants')

module.exports = {
  func: async message => {
    let pfp = await loadImage(message.member.avatarURL)
    if (message.mentions.length > 0) {
      const member = await message.channel.guild.getRESTMember(message.mentions[0].id)
      pfp = await loadImage(member.avatarURL)
    }
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    const ctx = canvas.getContext('2d')

    const encoder = new GIFEncoder(CANVAS_SIZE, CANVAS_SIZE)

    encoder.setDelay(10)
    encoder.setRepeat(0)
    encoder.start()

    for (let i = 1; i < 17; i++) {
      const layer = await loadImage(`assets/explosion/${i}.png`)
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.drawImage(pfp, 0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.drawImage(layer, 0, 0, CANVAS_SIZE, CANVAS_SIZE)
      encoder.addFrame(ctx)
    }

    encoder.finish()
    const buffer = Buffer.from(encoder.out.getData())

    await message.channel.createMessage({
      messageReference: { messageID: message.id }
    }, { file: buffer, name: 'boom.gif' })
  },
  name: 'explode',
  quickHelp: 'Boom.',
  examples: `\`${process.env.GLOBAL_BOT_PREFIX}explode\``,
  type: 'any',
  category: 'General',
  cooldown: 30000
}
