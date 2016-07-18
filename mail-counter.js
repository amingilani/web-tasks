// Adapted from the counter sample. This is a demo I built to track the number
// of times someone read an email I once sent. Too quickly hacked to refactor.

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

            switch (data.counter) {
                case 0:
                    response = "Hey Diego, the mail has not been read yet.";
                    break;
                case 1:
                    response = "Hey Diego, the mail was read once.";
                    break;
                default:
                    response = "Hey Diego, the mail was read " +
                        data.counter +
                        " times";
            }

            // return how many times the email has been viewed
            cb(null, response);
        });
    }
};
