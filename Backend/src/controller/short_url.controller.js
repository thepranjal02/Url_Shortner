import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlwithoutUser, createShortUrlwithUser } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlwithUser(data.url,req.user._id,data.slug)
    }else{  
        shortUrl = await createShortUrlwithoutUser(data.url)
    }
    res.status(200).json({shortUrl : process.env.App_URL + shortUrl})
})



export const redirectFromShortUrl = wrapAsync( async (req, res) => {

        const {id} = req.params;  
        const url = await getShortUrl(id);
        if (!url) {
            return res.status(404).send("URL not found");
        } 
        res.redirect(url.full_url);
}); 

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})