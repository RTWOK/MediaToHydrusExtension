const hydrusServer = '127.0.0.1'
const hydrusServerPort = '45869'
const hydrusServerFull = `http://${hydrusServer}:${hydrusServerPort}`
const apiKey = "" // add your own api key 

browser.menus.create({
    id: "send-to-hydrus",
    title: "Send to Hydrus",
    contexts: ["image", "video"]
});

browser.menus.onClicked.addListener(async function (info, tab) {
    if (info.menuItemId == "send-to-hydrus") {

        const urlData = {
            url: info.srcUrl,
            destination_page_name: "Firefox"
        };

        fetch(`${hydrusServerFull}/add_urls/add_url`, {
            method: 'POST',
            body: JSON.stringify(urlData),
            headers: {
                "Content-Type": "application/json",
                "Hydrus-Client-API-Access-Key": apiKey,
            }
        });

        // fetch(`${hydrusServerFull}/add_urls/get_url_files?url=${info.srcUrl}`, {
        //         headers: {
        //             "Hydrus-Client-API-Access-Key": apiKey,
        //         }
        // })
        // .then(data => data.json())
        // .then(data => data.url_file_statuses[0].hash)
        // .then(data => fetch(`${hydrusServerFull}/add_urls/associate_url`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         url_to_add: info.pageUrl,
        //         hash: data
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Hydrus-Client-API-Access-Key": apiKey,
        //     }
        // }));
    }
})
