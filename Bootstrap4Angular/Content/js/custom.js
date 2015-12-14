var customJavaScriptHelpers = new function () {
    // Sets a delay on how often the function passed to it can fire, pass a delay like normal and 'immediate' as well to have it fire on the leading edge of the timer rather than the trailing.
    var debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    return {
        debounce: debounce
    };
}();