(function () {
    'use strict';

    const measurementId = 'G-XNBDDZ4B31';
    const location = window.location;
    const isPortfolioPath = location.pathname === '/Portfolio' || location.pathname.startsWith('/Portfolio/');
    const isProduction = location.protocol === 'https:' && location.hostname === 'yashsaxena21.github.io' && isPortfolioPath;

    if (!isProduction || window['ga-disable-' + measurementId] === true || document.getElementById('google-analytics-tag')) {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    // The config command sends the initial page view automatically.
    window.gtag('config', measurementId);

    const tag = document.createElement('script');
    tag.id = 'google-analytics-tag';
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(tag);
})();
