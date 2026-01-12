(function () {
    const BLOCKED = [
        /g2288\.com/i,
        /ouraidream\.com/i,
        /faqmceatdamf\.com/i,
        /s\.click\.aliexpress\.com/i,
        /gkyqzaobsaw\.com/i,
        /zuzqimlzioj\.com/i,
    ];

    function isBlocked(url) {
        return typeof url === "string" && BLOCKED.some((r) => r.test(url));
    }

    function deny(url) {
        if (isBlocked(url)) {
            console.warn("Blocked redirect:", url);
            return true;
        }
        return false;
    }

    const origAssign = window.location.assign.bind(window.location);
    const origReplace = window.location.replace.bind(window.location);
    const origOpen = window.open.bind(window);

    window.location.assign = function (url) {
        if (!deny(url)) origAssign(url);
    };

    window.location.replace = function (url) {
        if (!deny(url)) origReplace(url);
    };

    window.open = function (url, ...args) {
        if (!deny(url)) return origOpen(url, ...args);
    };

    Object.defineProperty(window.location, "href", {
        set(url) {
            if (!deny(url)) origAssign(url);
        },
    });
})();
