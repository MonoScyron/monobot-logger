module.exports = {
  func: async (message, suffix) => {
    if (message.mentions.length === 0) {
      message.channel.createMessage({
        content: 'Incorrect usage, need someone to warn.',
        messageReference: { messageID: message.id }
      })
    }

    const warnedMember = message.mentions[0]
    const mod = message.member
    const reason = suffix.split(/ +/).slice(1).join(' ').trim()

    let modIcon = '<:whitelistUser:1241849026886766755>'
    if (message.channel.guild.ownerID === mod.id) {
      modIcon = '<:owner:1241849025741979699>'
    }

    const embed = {
      color: 12364603,
      thumbnail: {
        url: warnedMember.avatarURL,
        height: 128,
        width: 128
      },
      fields: [
        {
          name: 'Case:',
          value: '`420` <:success:1241213269746778122>',
          inline: true
        },
        {
          name: 'Type:',
          value: '`Warn`',
          inline: true
        },
        {
          name: 'Moderator:',
          value: `\`${mod.username}\` ${modIcon}`,
          inline: true
        },
        {
          name: 'Target:',
          value: `<:rightSort:1241973714384322570> \`${warnedMember.username}\` <:ban:1241959180735217665>`
        },
        {
          name: 'Reason:',
          value: `${reason}`
        }
      ]
    }

    await message.channel.createMessage({
      embeds: [embed],
      messageReference: { messageID: message.id }
    })
  },
  name: 'warn',
  quickHelp: '"Warn" a user for doing something bad',
  examples: `\`${process.env.GLOBAL_BOT_PREFIX}warn @AnyUser WarnMessage\``,
  type: 'any',
  category: 'General',
  cooldown: 10000
}
