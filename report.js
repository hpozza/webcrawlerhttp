function printReport(pages) {
    console.log('===========')
    console.log('REPORT')
    console.log('===========')
    const sortedPages = sortPages(pages)

    for (const page of sortedPages) {
        const url = page[0]
        const hits = page[1]
        console.log(`Found ${hits} links to pages: ${url}`)
    }
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => b[1] - a[1])
    return pagesArr;
}

module.exports = {
    sortPages,
    printReport
}