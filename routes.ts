import { Router } from 'https://deno.land/x/oak/mod.ts'
import { login } from './controllers/hometax.controller.ts'
import {fromFileUrl } from "https://deno.land/std@0.120.0/path/mod.ts"
import {readableStreamFromReader } from "https://deno.land/std@0.120.0/streams/conversion.ts"

const router = new Router()

router.get('/', async (context)=>{
    const u = new URL("./resources/html/index.html", import.meta.url);
    console.log("index init!")
    const file = await Deno.open(fromFileUrl(u));

    context.response.status= 200;
    context.response.body= readableStreamFromReader(file)
})
    .post('/hometax/login', login)
    
export default router