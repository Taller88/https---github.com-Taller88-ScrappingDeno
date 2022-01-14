import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {fromFileUrl } from "https://deno.land/std@0.120.0/path/mod.ts"
import {readableStreamFromReader } from "https://deno.land/std@0.120.0/streams/conversion.ts"

class App {
    app:Application;
    constructor(controllers:any){
        this.app = new Application();
        this.initializeControllers(controllers);
    }
    
    listen() {
        console.log("http://localhost:3000/ 3000 port open")
        this.app.listen({ port: 3000 });
      }
    
    getServer() {
        return this.app;
    }
    
  initializeControllers(controllers:any) {
    const router = new Router();

    router.get('/', async (context) => {
        const u = new URL("./resources/html/index.html", import.meta.url);
        console.log("index init!")
        const file = await Deno.open(fromFileUrl(u));
    
        context.response.status= 200;
        context.response.body= readableStreamFromReader(file)
    });

    controllers.forEach((controller:any) => {
      router.use(controller.router);
    });

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
    // this.app.use('/api', router);
  }
      
}

export default App;
