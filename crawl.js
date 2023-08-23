const {JSDOM} = require('jsdom');

async function crawlPage(currentURL) {
    console.log('currentURL: ', currentURL)
    try {
    const resp = await fetch(currentURL)

    if (resp.status > 399) {
        console.log(`error in fetch with status: ${resp.status} on page: ${currentURL}`);
        return;
    }

    const contentType = resp.headers.get('content-type')
    if (!contentType.includes("text/html")) {
        console.log(`non html response, content type: ${contentType}, on page ${currentURL}`)
    }

    } catch (err) {
        console.log(`error in fetch: ${err.message}`)
    }

    //console.log('resp', await resp.text());
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const el of linkElements) {
        if (el.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(baseURL + el.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // absolute
            try {
                const urlObj = new URL(el.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls;
}

function normalizeURL(url) {
    const urlObj = new URL(url);

    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}