module.exports = {
  name: 'warn',
  cooldown: 10000,
  func: async interaction => {
    const mod = interaction.member.user

    const userInteractionOpt = interaction.data.options?.find(o => o.name === 'user')
    const warnedMember = interaction.data.resolved.members.get(userInteractionOpt.value)
    const reason = interaction.data.options?.find(o => o.name === 'reason').value

    let modIcon = '<:whitelistUser:1241849026886766755>'
    if (interaction.channel.guild.ownerID === mod.id) {
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

    interaction.createMessage({
      embeds: [embed]
    })
  }
}
