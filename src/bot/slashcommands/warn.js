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
      title: 'Warn result:',
      description: `<:activity:1241213271172845649> **Reason:** ${reason}\n<:trustedAdmin:1241213273035112459> **Moderator:** <@${mod.id}> ${modIcon}`,
      fields: [
        {
          name: 'Warned:',
          value: `<:space:1241851810474364971><:success:1241213269746778122> ${warnedMember.username} [\`${warnedMember.id}\`]`
        }
      ]
    }

    interaction.createMessage({
      embeds: [embed]
    })
  }
}
