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
      title: 'Warn result:',
      description: `<:activity:1241213271172845649> **Reason:** ${reason}\n<:trustedAdmin:1241213273035112459> **Moderator:** <@${mod.id}> ${modIcon}`,
      fields: [
        {
          name: 'Warned:',
          value: `<:space:1241851810474364971><:success:1241213269746778122> ${warnedMember.username} [\`${warnedMember.id}\`]`
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
