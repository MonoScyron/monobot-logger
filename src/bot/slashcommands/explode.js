const { CANVAS_SIZE } = require('../utils/constants')
const { createCanvas, loadImage } = require('canvas')
const GIFEncoder = require('gifencoder')

module.exports = {
  name: 'explode',
  cooldown: 30000,
  func: async interaction => {
    try {
      let pfp = await loadImage(interaction.member.user.avatarURL)
      const userInteractionOpt = interaction.data.options?.find(o => o.name === 'user')
      if (userInteractionOpt) {
        pfp = await loadImage(interaction.data.resolved.members.get(userInteractionOpt.value).avatarURL)
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

      await interaction.createMessage({}, { file: buffer, name: 'boom.gif' })
    } catch (_) {}
  }
}
