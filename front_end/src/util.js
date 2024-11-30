export const getPeriod = (date) => {
    date = new Date(date);
    const today = new Date();
    const diff_secs = today.getTime() - date.getTime();
    const ms = 1000;
    const diff = (today.getMonth() - date.getMonth() + 12) % 12;

    if(diff_secs < 60 * ms) {
        // secs diff is less than or 60 => not up to a min (60 secs)
        const diff = (today.getSeconds() - date.getSeconds() + 60) % 60;
        return diff > 1 ? diff + ' secs ago' : 'a sec ago';
    } else if(diff_secs < 60 * 60 * ms) {
        // secs diff is less than or 60 * 60 => not up to a an hour (60 mins * 60 secs)
        // const diff = (today.getMinutes() - date.getMinutes() + 60) % 60;
        const diff = Math.floor(diff_secs / (60 * ms));
        return diff > 1 ? diff + ' mins ago' : 'a min ago';
    } else if(diff_secs < 24 * 60 * 60 * ms) {
        const diff = Math.floor(diff_secs / (60 * 60 * ms));
        return diff > 1 ? diff + ' hrs ago' : 'an hr ago';
        // use >= 11, cus getMonth is 0 indexed so Decemeber instead of being 12 is 11
    } else if(today.getFullYear() !== date.getFullYear() && diff >= 11) {
        const diff = today.getFullYear() - date.getFullYear();
        return diff > 1 ? diff + ' yrs ago' : '1 yr ago';
    } else if(today.getMonth() !== date.getMonth() && diff > 0) {
        return diff > 1 ? diff + ' mnth ago' : '1 mnth ago';
    } else {
        const diff = Math.floor(diff_secs / (24 * 60 * 60 * ms));
        return diff > 1 ? diff + ' days ago' : '1 day ago';
    }
};

export const formatDate = (date) => {
    date = new Date(date);
    return String(date).slice(4, 15);
};


export const setMessageFn = (fn, text) => {
    fn(text);
    setTimeout(() => fn(''), 2000);
};