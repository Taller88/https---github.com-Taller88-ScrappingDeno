export function sliceFunc(text:string, to:string, from?:string){
    var result;
    if(from){
        result = text.substring(text.indexOf(to)+to.length,text.length);

        result = result.substring(0,result.indexOf(from));    
    }else{
        result = text.substring(0,text.indexOf(to));
        console.log("[slice] text: "+ text);
        console.log("[slice] to: "+ to);
        console.log("[slice] result: "+ result);
        
    }
    
    return result;
}


