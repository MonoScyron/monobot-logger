module.exports = {
  func: async message => {
    let member = message.member
    if (message.mentions.length !== 0) {
      member = message.mentions[0]
    }
    const args = message.content.split(/ +/)
    args.forEach((m) => m.trim())

    // TODO: Create warn

    // TODO: Delete
    global.logger.info(args)
    global.logger.info(message.content)
  },
  name: 'warn',
  quickHelp: '"Warn" a user for doing something bad',
  examples: `\`${process.env.GLOBAL_BOT_PREFIX}warn WarnMessage\` <- warn self with message WarnMessage
  \`${process.env.GLOBAL_BOT_PREFIX}warn @AnyUser WarnMessage\` <- warn mentioned user with message WarnMessage`,
  type: 'any',
  category: 'General',
  cooldown: 10000
}
