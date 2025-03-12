//console.log('content')

/* Global variable */
let imageObject;

/* HELPERS */
const checkURL = () => {
    if (window.location.href.includes("https://www.alibaba.com/product-detail")) {
        return 1
    }
    else if (window.location.href.includes("https://www.aliexpress.us/item")) {
        return 2
    }
}

const untilSomethingLoads = async () => {
    return await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            let available;
            let checkURLRe = checkURL()
            if (checkURLRe === 1) {
                available = document?.querySelector("[module-title='detailManyImage']")?.querySelector("img") || document?.querySelector("[module-title='detailSingleImage']")?.querySelector("img") || document?.querySelector("[data-section-title='Product Description']")?.querySelector("img") || document?.getElementById("module_product_specification").querySelector("img")
            }
            else if (checkURLRe === 2) {    
                available = document?.querySelector("#root")
            }

            let finalState = true

            if (!available) finalState = false

            if (finalState) {
                resolve(true)
                clearInterval(interval)
            }
        }, 1000)
    })
}
/* SUPPORTING FUNCTION */

const mainImageSearch = () => {
    let productimages = []
    let leftmenu = document.getElementsByClassName("layout-left")[0]
    if (leftmenu) {
        let mainImageDiv = leftmenu.querySelector(".detail-product-image")?.querySelector(".image-list")?.querySelectorAll(".main-item") ??leftmenu?.querySelector(".thumb-list")?.querySelector(".detail-next-slick-track").querySelectorAll("div")
        if (mainImageDiv) {
            mainImageDiv.forEach(e => {
                let mainImage = e.querySelector("img")
                if (mainImage) {
                    productimages.push(mainImage?.src)
                }
            })
        }
       // console.log(productimages);
        // if(productimages.length===0){

        // }
    }
    return productimages
}

const variantImageSearch = () => {
    let varientImages = []
    let rightmenu = document.getElementsByClassName("layout-right")[0]
    let leftmenu = document.getElementsByClassName("layout-left")[0]
    if (rightmenu) {
        let varient = rightmenu.querySelectorAll(".info-item")[0]?.querySelectorAll("a")
        if (varient) {
            varient.forEach(e => {
                let image = e.querySelector("img")
                if (image) {
                    varientImages.push(image?.src)
                }
            })
        }
    }
    if(leftmenu){
        let varientDiv=leftmenu.querySelector(".main-screen")?.querySelector(".main-attr")?.querySelector(".sku-body")
        if(varientDiv){
            let imgeA=varientDiv.querySelectorAll("img")
            if(imgeA.length!==0){
                imgeA.forEach(el=>{
                    varientImages.push(el?.src)
                })
            }
        }
    }
    console.log(varientImages);
    return varientImages
}


const descriptionImageSearch = () => {
    let descriptionImages = []
    let leftmenu = document.getElementsByClassName("layout-left")[0]
    let otherLayout=document.getElementById("layout-other")

    if (leftmenu) {

        let descriptionDiv1 = leftmenu.querySelector("[module-title='detailManyImage']")?.childNodes[0]?.childNodes
        if (descriptionDiv1) {
            descriptionDiv1.forEach(e => {
                let image = e.querySelector("img")
                if (image) {
                    const imgURL = image?.getAttribute("data-src")??image?.getAttribute("src")
                    descriptionImages.push(`https:${imgURL}`)
                }
            })
        }
        let descriptionDiv2 = leftmenu.querySelectorAll("[module-title='detailSingleImage']")
        if (descriptionDiv2.length != 0) {
            descriptionDiv2.forEach(el => {
                let sigleProductdesc = el?.childNodes[0]?.childNodes
                if (sigleProductdesc) {
                    sigleProductdesc.forEach(e => {
                        let img = e.querySelector("img")
                        if (img) {
                            const imgURL = img?.getAttribute("data-src") ??img?.getAttribute("src")
                            descriptionImages.push(`https:${imgURL}`)
                        }
                    })
                }
            })
        }
        let descriptionDiv3 = leftmenu.querySelector("#module_product_specification")?.querySelector("[module-title='detailManyImage']")
        if (descriptionDiv3) {
            let descriptImage = descriptionDiv3.querySelectorAll("img")
            if (descriptImage.length !== 0) {
                descriptImage.forEach(elm => {
                    let imge = elm?.getAttribute("data-src")??elm?.getAttribute("src")
                    descriptionImages.push(`https:${imge}`)
                })
            }
        }
    }
    if(otherLayout){
        let descriptionDiv4=otherLayout.querySelector("#module_product_specification")
        if(descriptionDiv4){
            let descriptImagee=descriptionDiv4.querySelectorAll("img")
            if(descriptImagee.length!==0){
                descriptImagee.forEach(elem=>{
                    let imagee=elem?.getAttribute("data-src") ??elem?.getAttribute("src")
                    descriptionImages.push(`https:${imagee}`)
                })
            }
        }
    }
    //console.log(descriptionImages);
    return descriptionImages
}

const descriptionVideoSearch = () => {
    let descriptionVideos = []
    let leftmenu = document.getElementsByClassName("layout-left")[0]
    let otherLayout=document.getElementById("layout-other")
    if (leftmenu) {
        let descriptionVideoDiv = leftmenu.querySelector("#module_detail_video")?.querySelectorAll("video")
        if (descriptionVideoDiv) {
            descriptionVideoDiv.forEach(e => {
                let video = e.querySelector("[src]")
                if (video) {
                    descriptionVideos.push(video.src)
                }
            })
        }
    }
    if(otherLayout){
        let descriptionVideoDiv1=otherLayout.querySelectorAll("video")
        if(descriptionVideoDiv1.length!==0){
            descriptionVideoDiv1.forEach(el=>{
                let video1 = el.querySelector("[src]")
                if (video1) {
                    descriptionVideos.push(video1.src)
                }
            })
        }
    }
    return descriptionVideos
}

const productVideoSearch = () => {
    let productvideos = []
    let leftmenu = document.getElementsByClassName("layout-left")[0]
    if (leftmenu) {
        let productVideoDiv = leftmenu.querySelector("#main-video")?.querySelectorAll("video")
        if (productVideoDiv) {
            productVideoDiv.forEach(e => {
                let videoLink = e?.src
                if (videoLink[videoLink.length - 1] != "4") {
                    let modifiedLink = videoLink.split("?")[0]
                    productvideos.push(modifiedLink)
                }
            })
        }
    }
    return productvideos
}

const search = () => {
    console.log("searching");
    let obj = new Object()

    obj.productimages = mainImageSearch()
    obj.variantImages = variantImageSearch()
    obj.descriptionImages = descriptionImageSearch()
    obj.descriptionVideos = descriptionVideoSearch()
    obj.productvideos = productVideoSearch()

    imageObject = obj
    console.log("search end");
}
const searchAE = () => {

    let obj = new Object()

    obj.productimages = mainImageSearchAE()
    obj.variantImages = variantImageSearchAE()
    obj.descriptionImages = descriptionImageSearchAE()
    obj.descriptionVideos = descriptionVideoSearchAE()
    obj.productvideos = productVideoSearchAE()

    imageObject = obj
}

const mainImageSearchAE = () => {
    let productimagesAE = []
    const left = document.getElementsByClassName("pdp-info-left")[0]
    if (left) {
        let itemImage = left.querySelectorAll("img")
        if (itemImage.length != 0) {
            itemImage.forEach(e => {
                let url = e?.src
                if (url) {
                    let modUrl=imageRefine(url)
                    productimagesAE.push(modUrl)
                }
            })
        }
    }
    console.log(productimagesAE);
    return productimagesAE
}
const variantImageSearchAE = () => {
    let varientImagesAE = []
    let right = document.getElementsByClassName("pdp-info-right")[0]
    if (right) {
        let varientAE = right.querySelector(".sku-item--skus--MmsF8fD")
        if (varientAE) {
            let varImageAE = varientAE.querySelectorAll("img")
            if (varImageAE.length != 0) {
                varImageAE.forEach(e => {
                    let modUrl=imageRefine(e?.src)
                    varientImagesAE.push(modUrl)
                })
            }
        }
    }
    return varientImagesAE
}
const descriptionImageSearchAE = () => {
    let descriptionImagesAE = []
    let descriptionDivAE = document.getElementById("product-description")
    if (descriptionDivAE) {
        let descimgAE = descriptionDivAE.querySelectorAll("img")
        let b = []
        if (descimgAE.length != 0) {
            descimgAE.forEach(e => {
                // if (e.hasAttribute("height") || e.hasAttribute("width")) {
                // }
                // else {
                //     b.push(e)
                // }
                b.push(e)
            })
        }
        if (b.length != 0) {
            b.forEach(em => {
                let modUrl=imageRefine(em?.src)
                descriptionImagesAE.push(modUrl)
            })
        }
    }
    return descriptionImagesAE
}
const productVideoSearchAE = () => {
    let productvideosAE = []

    const left = document.getElementsByClassName("pdp-info-left")[0]
    if (left) {
        let productVideoAE = left?.querySelectorAll("video")
        if (productVideoAE.length != 0) {
            productVideoAE.forEach(e => {
                let source = e.querySelector("source")
                if (source.type === "video/mp4") {
                    productvideosAE.push(source?.src)
                }
            })
        }
    }
    return productvideosAE
}

const descriptionVideoSearchAE = () => {
    let descriptionVideosAE = []

    let descriptionDivAE = document.getElementById("product-description")
    if (descriptionDivAE) {
        let descVideoAE = descriptionDivAE.querySelectorAll("video")
        if (descVideoAE.length !== 0) {
            descVideoAE.forEach(e => {
                let source = e.querySelector("source")
                if (source) {
                    if (source.type === "video/mp4") {
                        descriptionVideosAE.push(source?.src)
                    }
                }
                else {
                    descriptionVideosAE.push(e?.src)
                }
            })
        }
    }
    return descriptionVideosAE
}

const mainHandler = async () => {
    if (checkURL()) {
        const status = await untilSomethingLoads()
        if (status) {
            let urlchecked = checkURL()
            if (urlchecked === 1) {
                search()
            }
            else if (urlchecked === 2) {
                searchAE()
            }
        }
    }
    // else {
    //     console.log("else")
    //     imageObject = null
    // }
}

mainHandler()

/*  LISTENERS */
chrome.runtime.onMessage.addListener(async (message, sender, sendResponce) => {
    let { msg } = message
    console.log(msg);
    if (msg === "ui-start") {
        let val = await pollFunction(imageObject)
        if (val) {
            chrome.runtime.sendMessage({ res: imageObject })
        }
    }
    else if (msg === "start") {
        mainHandler()
    }
})

function pollFunction(imageObj) {
    return new Promise((resolve) => {
        const pollInterval = setInterval(() => {
            //fn()
            //mainHandler()
            // console.log(imageObj);
            if (imageObj) {
                clearInterval(pollInterval)
                resolve(true)
                //chrome.runtime.sendMessage({ res: imageObject })
            }
        }, 1000);
    });
}



//https://www.aliexpress.us/item/3256805813928663.html?spm=a2g0o.productlist.main.13.7297d674Kf0ps6&algo_pvid=dd1f0e86-3593-4850-9999-0039231a49d5&guide_trace=2d87fdc1-f272-46fa-8879-76983bc6a63b&algo_exp_id=dd1f0e86-3593-4850-9999-0039231a49d5-6&pdp_npi=4%40dis%21EUR%2110.12%210.96%21%21%2176.46%21%21%402101f49316984014855145745e032c%2112000035248502293%21sea%21US%210%21AB&curPageLogUid=uHg2SW9HGKnn
//from: chrome
//definition: h265


const imageRefine = (imageurl) => {
    let newImageUrl
    if(imageurl){
        if (imageurl.endsWith(".webp")) {
            // Replace ".webp" with ".jpg" and assign the new URL to a variable
            newImageUrl = imageurl.replace("_.webp", "");
    
            // Now, newImageUrl contains the updated URL with the ".jpg" extension
        }
        else{
            newImageUrl=imageurl
        }
    }
    return newImageUrl
}