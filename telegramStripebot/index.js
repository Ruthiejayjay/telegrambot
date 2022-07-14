const Telegraf = require('telegraf')
const axios = require('axios')
const bot = new Telegraf('5561189835:AAHwhQrWD-OjGtr3foTrHUreZH0ZJE5eUaA')
const API_URL = ('https://api.stripe.com/v1/checkout/sessions')

bot.command('start', ctx => {
    sendStartMessage(ctx)
})

bot.action('start', ctx => {
    ctx.deleteMessage()
    sendStartMessage(ctx)
})

function sendStartMessage(ctx) {
    let message = 'Hello!! ' + ctx.from.first_name + ', To view a list of our products click product below';
    bot.telegram.sendMessage(ctx.chat.id, message,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Products", callback_data: 'product' }
                    ],
                    [
                        { text: "Cancel", callback_data: 'cancel' }
                    ]
                ]
            }
        })
};

bot.action('cancel', ctx => {
    ctx.deleteMessage()
    ctx.reply('Thank you for using this bot')
})

bot.action('product', ctx => {
    let message = 'Click any of the buttons to pick the product you want';
    bot.telegram.sendMessage(ctx.chat.id, message,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Sunglasses", callback_data: 'sunglasses' },
                        { text: "Shawarma", callback_data: 'shawarma' }
                    ],
                    [
                        { text: "Books", callback_data: 'books' },
                        { text: "Pizza", callback_data: 'pizza' }
                    ],
                    [
                        { text: "Pancakes", callback_data: 'pancakes' },
                        { text: "Donuts", callback_data: 'donuts' }
                    ],
                    [
                        { text: "Back to Menu", callback_data: 'start' },
                    ]
                ]
            }
        })
});

bot.action('sunglasses', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'img/sunglasses.jpg'
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Click the purchase button to make payments',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Purchase", callback_data: 'purchase1' }
                    ],
                    [
                        {text: "Back to Products", callback_data: 'product'}
                    ],
                    [
                        { text: "Cancel", callback_data: 'cancel' }
                    ]
                ]
            }
        })
});
bot.action('purchase1', ctx => {
    try {
        var qs = require('qs');
        var data = qs.stringify({
            'mode': 'subscription',
            'line_items[0][price]': 'price_1LLUHmDw37K7KqJsew4EfjDw',
            'line_items[0][quantity]': '1',
            'cancel_url': 'https://example.com/cancel',
            'success_url': 'https://example.com/success'
        });
        var config = {
            method: 'post',
            url: API_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer  sk_test_51LIEnMDw37K7KqJsgA0MLKcjUNYnca6j2Fn4VseXUsSaQstpdWUloKZN75KT0Ia4aD48D1h9nMfxyUg36xtbQynz00LyjMYwbk'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                ctx.reply(JSON.stringify(response.data.url));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered')
    }
})

bot.action('shawarma', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'img/shawarma.jpg'
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Click the purchase button to make payments',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Purchase", callback_data: 'purchase2' }
                    ],
                    [
                        {text: "Back to Products", callback_data: 'product'}
                    ],
                    [
                        { text: "Cancel", callback_data: 'cancel' }
                    ]
                ]
            }
        })
});
bot.action('purchase2', ctx => {
    try {
        var qs = require('qs');
        var data = qs.stringify({
            'mode': 'subscription',
            'line_items[0][price]': 'price_1LLW76Dw37K7KqJs8602dQIO',
            'line_items[0][quantity]': '1',
            'cancel_url': 'https://example.com/cancel',
            'success_url': 'https://example.com/success'
        });
        var config = {
            method: 'post',
            url: API_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer  sk_test_51LIEnMDw37K7KqJsgA0MLKcjUNYnca6j2Fn4VseXUsSaQstpdWUloKZN75KT0Ia4aD48D1h9nMfxyUg36xtbQynz00LyjMYwbk'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                ctx.reply(JSON.stringify(response.data.url));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered')
    }
})

bot.action('books', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'img/books.jpg'
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Click the purchase button to make payments',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Purchase", callback_data: 'purchase3' }
                    ],
                    [
                        {text: "Back to Products", callback_data: 'product'}
                    ],
                    [
                        { text: "Cancel", callback_data: 'cancel' }
                    ]
                ]
            }
        })
});
bot.action('purchase3', ctx => {
    try {
        var qs = require('qs');
        var data = qs.stringify({
            'mode': 'subscription',
            'line_items[0][price]': 'price_1LLW4zDw37K7KqJszIZtguYW',
            'line_items[0][quantity]': '1',
            'cancel_url': 'https://example.com/cancel',
            'success_url': 'https://example.com/success'
        });
        var config = {
            method: 'post',
            url: API_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer  sk_test_51LIEnMDw37K7KqJsgA0MLKcjUNYnca6j2Fn4VseXUsSaQstpdWUloKZN75KT0Ia4aD48D1h9nMfxyUg36xtbQynz00LyjMYwbk'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                ctx.reply(JSON.stringify(response.data.url));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered')
    }
});

bot.action('pizza', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'img/pizza.jpg'
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Click the purchase button to make payments',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Purchase", callback_data: 'purchase4' }
                    ],
                    [
                        {text: "Back to Products", callback_data: 'product'}
                    ],
                    [
                        { text: "Cancel", callback_data: 'cancel' }
                    ]
                ]
            }
        })
});
bot.action('purchase4', ctx => {
    try {
        var qs = require('qs');
        var data = qs.stringify({
            'mode': 'subscription',
            'line_items[0][price]': 'price_1LLW9aDw37K7KqJsuGvzPF4O',
            'line_items[0][quantity]': '1',
            'cancel_url': 'https://example.com/cancel',
            'success_url': 'https://example.com/success'
        });
        var config = {
            method: 'post',
            url: API_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer  sk_test_51LIEnMDw37K7KqJsgA0MLKcjUNYnca6j2Fn4VseXUsSaQstpdWUloKZN75KT0Ia4aD48D1h9nMfxyUg36xtbQynz00LyjMYwbk'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                ctx.reply(JSON.stringify(response.data.url));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered')
    }
});

bot.action('pancakes', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'img/pancakes.jpg'
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Click the purchase button to make payments',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Purchase", callback_data: 'purchase5' }
                    ],
                    [
                        {text: "Back to Products", callback_data: 'product'}
                    ],
                    [
                        { text: "Cancel", callback_data: 'cancel' }
                    ]
                ]
            }
        })
});
bot.action('purchase5', ctx => {
    try {
        var qs = require('qs');
        var data = qs.stringify({
            'mode': 'subscription',
            'line_items[0][price]': 'price_1LLW5pDw37K7KqJsxsm8asl1',
            'line_items[0][quantity]': '1',
            'cancel_url': 'https://example.com/cancel',
            'success_url': 'https://example.com/success'
        });
        var config = {
            method: 'post',
            url: API_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer  sk_test_51LIEnMDw37K7KqJsgA0MLKcjUNYnca6j2Fn4VseXUsSaQstpdWUloKZN75KT0Ia4aD48D1h9nMfxyUg36xtbQynz00LyjMYwbk'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                ctx.reply(JSON.stringify(response.data.url));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered')
    }
});

bot.action('donuts', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: 'img/donuts.jpeg'
    })
    bot.telegram.sendMessage(ctx.chat.id, 'Click the purchase button to make payments',
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Purchase", callback_data: 'purchase6' }
                    ],
                    [
                        {text: "Back to Products", callback_data: 'product'}
                    ],
                    [
                        { text: "Cancel", callback_data: 'cancel' }
                    ]
                ]
            }
        })
});
bot.action('purchase6', ctx => {
    try {
        var qs = require('qs');
        var data = qs.stringify({
            'mode': 'subscription',
            'line_items[0][price]': 'price_1LLXPDDw37K7KqJsKa9R9pqk',
            'line_items[0][quantity]': '1',
            'cancel_url': 'https://example.com/cancel',
            'success_url': 'https://example.com/success'
        });
        var config = {
            method: 'post',
            url: API_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer  sk_test_51LIEnMDw37K7KqJsgA0MLKcjUNYnca6j2Fn4VseXUsSaQstpdWUloKZN75KT0Ia4aD48D1h9nMfxyUg36xtbQynz00LyjMYwbk'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                ctx.reply(JSON.stringify(response.data.url));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered')
    }
});

bot.launch();