// Try me locally using: wt serve --storage-file counter.json counter.js

module.exports = function(ctx, cb) {
    if (ctx.data.yo) {
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
        ctx.storage.get(function(err, data) {
            if (err) return cb(err);
            if (!data) data = {};
            if (!data.counter) data.counter = 0;

            // return how many times the email has been viewed
            response = "Hey Diego, the mail was read " +
            data.counter +
            " times";
            cb(null, response);
        });
    }
};
