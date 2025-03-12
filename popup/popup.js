
const mainImg = document.getElementById("mainImg")
const varientimg = document.getElementById("varientimg")
const descImg = document.getElementById("descImg")
const productVideo = document.getElementById("productVideo")
const descVideo = document.getElementById("descVideo")
const DownloadAll = document.getElementById("DownloadAll")


const contentBody = document.getElementById("wrapper")
const notFoundBody = document.getElementById("page-info")
const loading = document.getElementById("loader")

const navigator = document.getElementById("navigator")
const navigatorAE = document.getElementById("navigatorAE")
/* Global Variables*/

/* References */
const footer = document.getElementById("footer")
const rate = document.getElementById("rate")





const urlcheck = (urls) => {
    if (urls.includes("https://www.alibaba.com/product-detail") || urls.includes("https://www.aliexpress.us/item")) {
        return true
    }
    return false
}

const downloadfunction = (url) => {
    const filename = url.split('/').pop(); // Extract the filename from the URL
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.style.display = 'none';
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));

}
const downloadSeparete = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        downloadfunction(e)
    }
}
const allImageDownload = (arrObj) => {
    let m = []
    for (const key in arrObj) {
        if (arrObj.hasOwnProperty(key)) {
            //console.log(`Elements in ${key}:`);
            for (const element of arrObj[key]) {
                m.push(element)

            }
        }
    }
    m.forEach((e, i) => {
        downloadfunction(e)
    })
}
const toggleNotActiveFunction = (elementName) => {
    elementName.setAttribute("disabled", "true")
    elementName.classList.toggle("not-active")

    elementName.classList.remove("remove-hover-effect");

}

const toggleActiveFunction = (elementName) => {
    elementName.classList.toggle("active")
}
const intitializeMain = () => {
   if (rate) {
        rate.addEventListener("click", () => {
            let p = chrome.runtime.id
            chrome.tabs.create({
                active: true,
                url: `https://chromewebstore.google.com/detail/${p}/reviews`
                //url:`https://microsoftedge.microsoft.com/addons/detail/${p}/reviews`
            })

        })
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        urls = tabs[0].url
        if (!urlcheck(urls)) {
            notFoundBody.classList.remove('not-seen')
            loading.classList.add("not-seen")
            if (notFoundBody.style.display !== "none") {
                navigator.addEventListener("click", () => {
                    chrome.tabs.create({
                        active: true,
                        url: "https://www.alibaba.com/"
                    })
                })
                navigatorAE.addEventListener("click", () => {
                    chrome.tabs.create({
                        active: true,
                        url: "https://www.aliexpress.com/"
                    })
                })
            }
        }
        chrome.tabs.sendMessage(tabs[0].id, { msg: "ui-start" }, (responce) => {
            if (responce) {
            }
        })
    })
}


intitializeMain()


const uiInteract = (scrappedData) => {
    if (Object.keys(scrappedData).length != 0) {
        if (scrappedData["descriptionImages"]) {
            if (scrappedData["descriptionImages"].length === 0) {
                toggleNotActiveFunction(descImg)
            }
            else {
                toggleActiveFunction(descImg)
                descImg.addEventListener("click", () => {
                    downloadSeparete(scrappedData["descriptionImages"])
                })
            }
        }
        if (scrappedData["descriptionVideos"]) {
            if (scrappedData["descriptionVideos"].length === 0) {
                toggleNotActiveFunction(descVideo)
            }
            else {
                toggleActiveFunction(descVideo)
                descVideo.addEventListener("click", () => {
                    downloadSeparete(scrappedData["descriptionVideos"])
                })
            }
        }
        if (scrappedData["productimages"]) {
            if (scrappedData["productimages"].length === 0) {
                toggleNotActiveFunction(mainImg)
            }
            else {
                toggleActiveFunction(mainImg)
                mainImg.addEventListener("click", () => {
                    downloadSeparete(scrappedData["productimages"])
                })
            }
        }
        if (scrappedData["productvideos"]) {
            if (scrappedData["productvideos"].length === 0) {
                toggleNotActiveFunction(productVideo)
            }
            else {
                toggleActiveFunction(productVideo)
                productVideo.addEventListener("click", () => {
                    downloadSeparete(scrappedData["productvideos"])
                })
            }
        }
        if (scrappedData["variantImages"]) {
            if (scrappedData["variantImages"].length === 0) {
                toggleNotActiveFunction(varientimg)
            }
            else {
                toggleActiveFunction(varientimg)
                varientimg.addEventListener("click", () => {
                    downloadSeparete(scrappedData["variantImages"])
                })
            }
        }
        toggleActiveFunction(DownloadAll)
        DownloadAll.addEventListener("click", () => {
            allImageDownload(scrappedData)
        })
    }
}

// function callFunctionThreeTimes(targetFunction) {
//     let count = 0;
//     const intervalId = setInterval(function () {
//         intitializeMain();
//         count++;

//         if (count >= 3) {
//             clearInterval(intervalId);
//         }
//     }, 2000); // 2000 milliseconds = 2 seconds
// }

// callFunctionThreeTimes()


chrome.runtime.onMessage.addListener(async function (response, sender, sendResponse) {
    const { res } = response
    console.log(res);
    if (res) {
        contentBody.classList.remove('not-seen')
        loading.classList.add("not-seen")
        uiInteract(res)
    }

})
