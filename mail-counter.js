// Adapted from the counter sample. This is a demo I built to track the number
// of times someone read an email I once sent. Too quickly hacked to refactor.

// How to use
// 1. add an image to an email pointing to /script?increment=1
// 2. view the number of times the email was read at /script
// 3. reset the counter at /script?reset=1

module.exports = function(ctx, cb) {
    // incase I need to reset the counter
    if (ctx.data.reset) {
        ctx.storage.get(function(err, data) {
            if (err) return cb(err);
            if (!data) data = {};
            data.counter = 0;
            ctx.storage.set(data, function(err) {
                if (err) return cb(err);
                cb(null, data);
            });
        });
    } else if (ctx.data.increment) {
        // increment the counter if the email is read
        ctx.storage.get(function(err, data) {
            if (err) return cb(err);
            if (!data) data = {};
            if (!data.counter) data.counter = 0;

            data.counter++;
            data.lastRead = new Date;


            ctx.storage.set(data, function(err) {
                if (err) return cb(err);

                cb(null, data);
            });
        });
    } else {
        // tell how many times the email was read
        ctx.storage.get(function(err, data) {
            if (err) return cb(err);
            if (!data) data = {};
            if (!data.counter) data.counter = 0;

            var options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };

            switch (data.counter) {
                case 0:
                    response = "Hey Diego, the mail has not been read yet.";
                    break;
                case 1:
                    response = "Hey Diego, the mail was read once " +
                    "at " +
                    data.lastRead.toLocaleTimeString("en-us", options) +
                    " server time";
                    break;
                default:
                    response = "Hey Diego, the mail was read " +
                        data.counter +
                        " times. " +
                        "Last at: " +
                        data.lastRead.toLocaleTimeString("en-us", options) +
                        " server time";
            }

            // return how many times the email has been viewed
            cb(null, response);
        });
    }
};
