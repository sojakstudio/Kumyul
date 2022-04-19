const db = require('quick.db');
let { MessageEmbed } = require('discord.js');
const img = 'https://blog.kakaocdn.net/dn/qpua2/btqyqx0g6YA/NYd5fopPNOBPwxDiYIXDK1/img.jpg';

module.exports = {
  name: "경고수",
  description: "경고수를 표시합니다.",
  execute(msg) {
    const id = msg.author.id;
    const guild = msg.guild.id;
    const temp = msg.content.slice(5);

    const warn_get = `warn_${guild}_${id}`;
    const warn = db.get(warn_get);

    if (temp == '') {
      const answerMessage = new MessageEmbed()
        .setAuthor('검열봇', img)
        .setTitle('**⚠️ 경고 수**')
        .setColor(0xBDBDBD)
        .setDescription(`**현재 <@${id}> 님의 경고 횟수입니다!**`)
        .addField('누적 경고수', `${!warn ? '당신은 현재 경고가 없습니다!' : warn}`);
      msg.reply({ embeds: [answerMessage] });
      return;
    }

    if (temp.startsWith('<@&') || !temp.startsWith('<@') && !temp.endsWith('>')) {
      const answerMessage = new MessageEmbed()
        .setAuthor('검열봇', img)
        .setTitle('**⚠️ 경고 수**')
        .setColor(0xBDBDBD)
        .setDescription(`**${temp} (이)라는 유저는 존재하지 않습니다!**`);
      msg.reply({ embeds: [answerMessage] });
      return;
    }

    if (!warn) {
      const answerMessage = new MessageEmbed()
        .setAuthor('검열봇', img)
        .setTitle('**⚠️ 경고 수**')
        .setColor(0xBDBDBD)
        .setDescription(`**현재 ${temp} 님의 경고 횟수입니다!**`)
        .addField('누적 경고수', `${temp != `<@${id}>` ? `${temp} 님은 현재 경고가 없습니다!` : '당신은 현재 경고가 없습니다!'}`);
      msg.reply({ embeds: [answerMessage] });
      return;
    }

    const answerMessage = new MessageEmbed()
      .setAuthor('검열봇', img)
      .setTitle('**⚠️ 경고 수**')
      .setColor(0xBDBDBD)
      .setDescription(`**현재 ${temp} 님의 경고 횟수입니다!**`)
      .addField('누적 경고수', `${temp != `<@${id}>` ? `${warn ? warn : `현재 ${temp} 님은 경고가 없습니다!`}` : `${warn ? warn : `당신은 현재 경고가 없습니다!`}`}`);
    msg.reply({ embeds: [answerMessage] });
  }
}