const Telegraf = require('telegraf');
const bot = new Telegraf('5383001639:AAF4Emre88bYYtY4BZM5r8O6lQSaVQ8yWeI');

bot.command(['start', 'help'], ctx => {
    let message = `
    /newyork - get image of New York
    /dubai - get gif of Dubai
    /singapore - get location of Singapore
    /cities - get photos of cities
    /citieslist - get text file of cities
    You can also upload documents and images to get a download link for them.
    `;
    ctx.reply(message)
})

bot.command('test', ctx => {
    //url
    //bot.telegram.sendPhoto(ctx.chat.id, "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80")

    //file path
    bot.telegram.sendPhoto(ctx.chat.id, { source: "res/london.jpg" },
        {
            reply_to_message_id: ctx.message.message_id
        }
    );

    //id
    bot.telegram.sendPhoto(ctx.chat.id,
        "AgACAgQAAxkBAAMVYo3sq3qxf46LXMLrj8BPgJpXVq0AAs-5MRu_Z3BQLYtdEBs8ucQBAAMCAANtAAMkBA");


})

//newyork keyword
bot.command('newyork', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'res/newyork.jpg'
    },
        {
            reply_to_message_id: ctx.message.message_id
        }
    )
})

//dubai gif
bot.command('dubai', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video")
    bot.telegram.sendAnimation(ctx.chat.id, "https://media.giphy.com/media/132Ob31MoSjuOA/giphy.gif")
})

//cities command
bot.command('cities', ctx => {
    let cities = ['res/dubai.jpg', 'res/hongkong.jpg',
        'res/london.jpg', 'res/newyork.jpg', 'res/singapore.jpg'];

    let result = cities.map(city => {
        return {
            type: 'photo',
            media: {
                source: city
            }
        }
    })
    bot.telegram.sendMediaGroup(ctx.chat.id, result)
})

//send document
bot.command('citieslist', ctx => {
    bot.telegram.sendDocument(ctx.chat.id,
        {
            source: "res/cities.txt"
        },
        {
            thumb: { source: "res/dubai.jpg" }
        }
    )
})

//send location
bot.command('singapore', ctx => {
    bot.telegram.sendLocation(ctx.chat.id, 1.290270, 103.851959);
})

//get download link document
bot.on('message', async ctx => {
    if (ctx.updateSubTypes[0] == 'document') {
        try {
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id);
            ctx.reply('Your download link: ' + link);
        } catch (err) {
            console.log(err)
            ctx.reply(err.description)
        }
    } else if (ctx.updateSubTypes[0] == 'photo') {
        try {
            let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
            ctx.reply('Your download link: ' + link);
        } catch (err) {
            console.log(err)
            ctx.reply(err.description)
        }
    }
})

bot.start((ctx) => {
    ctx.reply("hello")
})

bot.launch();