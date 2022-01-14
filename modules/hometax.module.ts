import axiod from "https://deno.land/x/axiod/mod.ts";
import {
    decode as base64Decode,
    encode as base64Encode,
  } from 'https://deno.land/std@0.82.0/encoding/base64.ts';
import {sliceFunc} from "../common/commonFunc.ts";
        
export class Hometax {
    host = "https://www.hometax.go.kr";
    path = "";

    cookies = "";

    reqTxId = "";
    constructor(){
        
    }
    async login(userName:string, userPhone:string, userSsn1:string, userSsn2:string){
        
        this.path = "/gpin/v1/request_tx";
        console.log("[Hometax] login init!");
        var result = await axiod({
            method: 'post',
            url: this.host+this.path,
            data:{
                params:{
                    signTarget:''
                }
            }
          });
        
          console.log("POST result: "+ result.data.reqTxId);
          this.reqTxId = result.data.reqTxId;
          var postData = "reqTxId="+this.reqTxId+"&popupType=layer&userType=R&ssn=&userName=";


          var result = await axiod({
            method: 'post',
            url: "https://www.hometax.go.kr/gpin/easy-login",
            data:postData,
            headers:{
                'Host' : 'www.hometax.go.kr',
                'Connection' : 'keep-alive',
                'Cache-Control' : 'max-age=0',
                'sec-ch-ua' : '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
                'sec-ch-ua-mobile' : '?0',
                'sec-ch-ua-platform' : '"Windows"',
                'Upgrade-Insecure-Requests' : '1',
                'Origin' : 'https://www.hometax.go.kr',
                'Content-Type' : 'application/x-www-form-urlencoded',
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
                'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Sec-Fetch-Site' : 'same-origin',
                'Sec-Fetch-Mode' : 'navigate',
                'Sec-Fetch-Dest' : 'iframe',
                'Accept-Encoding' : 'gzip, deflate, br',
                'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        });

        // Optional
        var headers = result.headers;
        this.cookies += cookiegenerate(headers);
        console.log("this.cookies : "+ this.cookies);
        
        
      
        var path = "https://www.hometax.go.kr/gpin/v1/certification/notice?reqTxId="+this.reqTxId;


        var postData = '{"idn":"","userInfo":{"isMember":false,"name":"'+base64Encode(userName)+'","phoneNumber":"'+base64Encode(userPhone)+'","ssn1":"'+base64Encode(userSsn1)+'","ssn2":"'+base64Encode(userSsn2)+'","birthday":"","privacy":"1","terms":"1","policy3":"1","policy4":"1"},"provider":"kakao"}'

        // 모바일로 요청
        var result = await axiod({
            method: 'post',
            url: "https://www.hometax.go.kr/gpin/v1/certification/notice?reqTxId="+this.reqTxId,
            data:postData,
            headers:{
                'Connection' : 'keep-alive'
                ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'sec-ch-ua-mobile' : ' ?0'
                ,'User-Agent' : ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform' : ' "Windows"'
                ,'Content-type' : 'application/json'
                ,'Accept' : '*/*'
                ,'Origin' : 'https://www.hometax.go.kr'
                ,'Sec-Fetch-Site' : 'same-origin'
                ,'Sec-Fetch-Mode' : 'cors'
                ,'Sec-Fetch-Dest' : 'empty'
                ,'Referer' : 'https://www.hometax.go.kr/gpin/easy-login'
                ,'Accept-Encoding' : 'gzip, deflate, br'
                ,'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                ,'Cookie' :  this.cookies
            }
        });

        
        return result.data.resultCode
        

    }
    async 소득조회(){
        var host = "https://www.hometax.go.kr";
        console.log("소득 조회 init")
        console.log("this.reqTxId: "+this.reqTxId)
    
        var postData = '{"reqTxId":"'+this.reqTxId+'","userNm":"user_name","provider":"kakao"}';
            
        // process.env
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
        var result = await axiod({
          method: 'post', 
          url: "https://www.hometax.go.kr/gpin/v1/certification/notice/result",
          data:postData,
        //   rejectUnauthorized: 'false',// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
          headers:{
              'Host' : ' www.hometax.go.kr'
              ,'Connection' : ' keep-alive'
              ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
              ,'sec-ch-ua-mobile' : ' ?0'
              ,'User-Agent' : ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
              ,'sec-ch-ua-platform' : ' "Windows"'
              ,'Content-type' : ' application/json'
              ,'Accept' : '*/*'
              ,'Origin' : 'https://www.hometax.go.kr'
              ,'Sec-Fetch-Site' : ' same-origin'
              ,'Sec-Fetch-Mode' : ' cors'
              ,'Sec-Fetch-Dest' : ' empty'
              ,'Referer' : ' https://www.hometax.go.kr/gpin/easy-login'
              ,'Accept-Encoding' : ' gzip, deflate, br'
              ,'Accept-Language' : ' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
              ,'Cookie' : this.cookies
          }
        });
    
        console.log("1. [gpin/v1/certification/notice/result]:"+ result.data.resultCode);
    
        var headers = result.headers
        this.cookies += cookiegenerate(headers)
        console.log("this.cookies : "+ this.cookies);
        
        
        postData = 'moisCertYn=Y&reqTxId='+this.reqTxId+'&ssoStatus=&portalStatus=&scrnId=UTXPPABA01&userScrnRslnXcCnt=1920&userScrnRslnYcCnt=1080'
        result = await axiod({
            method: 'post',
            url: "https://www.hometax.go.kr/pubcLogin.do?domain=hometax.go.kr&mainSys=Y",
            data:postData,
            // rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:{
                'Host' : ' www.hometax.go.kr'
                ,'Connection' : ' keep-alive'
                ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'Accept' : ' text/plain, */*; q=0.01'
                ,'Content-Type' : ' application/x-www-form-urlencoded; charset=UTF-8'
                ,'X-Requested-With' : ' XMLHttpRequest'
                ,'sec-ch-ua-mobile' : ' ?0'
                ,'User-Agent' : ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform' : ' "Windows"'
                ,'Origin' : ' https://www.hometax.go.kr'
                ,'Sec-Fetch-Site' : ' same-origin'
                ,'Sec-Fetch-Mode' : ' cors'
                ,'Sec-Fetch-Dest' : ' empty'
                ,'Referer' : ' https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot='
                ,'Accept-Encoding' : ' gzip, deflate, br'
                ,'Accept-Language' : ' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                ,'Cookie' : this.cookies
            }
        }); 
     
        console.log("2. [/pubcLogin.do?domain=hometax.go.kr&mainSys=Y] result: "+ result.data.toString());
        var tin = sliceFunc(result.data.toString(), "'tin' : '", "',");
        // tin = tin.substring(tin.indexOf("' : '")+5, tin.length);
    
        console.log("3. tin: "+ tin);
    
        // console.log("4.set - cookie: "+result.headers.get("set-cookie"));
        
        var headers = result.headers;
        this.cookies += cookiegenerate(headers)+"NTS_LOGIN_SYSTEM_CODE_P=TXPP;";
        console.log("this.cookies : "+ this.cookies);


        // var addedCookie = result.headers.get("set-cookie")!;
        // var txppSessionID = "TXPPsessionID="+sliceFunc(addedCookie, "TXPPsessionID=", ";");
        // var  = sliceFunc(addedCookie, "TXPPsessionID=", ";");
        
        // this.cookies += this.cookies+";"+txppSessionID+";NTS_LOGIN_SYSTEM_CODE_P=TXPP;";
    
        console.log("5. cookieVal: "+ this.cookies)
        postData = "<map id='postParam'><popupYn></popupYn></map>"
        // 홈텍스는 쿠키값 영향 많이 받음
        result = await axiod({
            method: 'post',
            url: "https://www.hometax.go.kr/permission.do?screenId=UTXPPABA01",
            data:postData,
            // rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
            headers:{
                'Host' : ' www.hometax.go.kr'
                ,'Connection' : ' keep-alive'
                ,'sec-ch-ua' : ' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                ,'Accept' : ' application/xml; charset=UTF-8'
                ,'Content-Type' : ' application/xml; charset=UTF-8'
                ,'sec-ch-ua-mobile' : '?0'
                ,'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                ,'sec-ch-ua-platform' : '"Windows"'
                ,'Origin' : 'https://www.hometax.go.kr'
                ,'Sec-Fetch-Site' : 'same-origin'
                ,'Sec-Fetch-Mode' : 'cors'
                ,'Sec-Fetch-Dest' : 'empty'
                ,'Referer' : 'https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot='
                ,'Accept-Encoding' : 'gzip, deflate, br'
                ,'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                ,'Cookie' : this.cookies
            }
        });
        
        var headers = result.headers;
        this.cookies += cookiegenerate(headers)+"NTS_LOGIN_SYSTEM_CODE_P=TXPP;";
        console.log("this.cookies : "+ this.cookies);

        console.log("6. [/permission.do?screenId=UTXPPABA01] result: "+ result.data);
        
            var path = "https://tewf.hometax.go.kr/permission.do?screenId=UTEWFCBA01";
            postData = "<map id='postParam'><popupYn>false</popupYn></map>";
    
            result = await axiod({
                method: 'post',
                url: path,
                data:postData,
                // rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
                headers:{
                    'Host':'tewf.hometax.go.kr'
                    ,'Connection':'keep-alive'
                    ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                    ,'Accept':'application/xml; charset=UTF-8'
                    ,'Content-Type':'application/xml; charset=UTF-8'
                    ,'sec-ch-ua-mobile':'?0'
                    ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                    ,'sec-ch-ua-platform':'"Windows"'
                    ,'Origin':' https://tewf.hometax.go.kr'
                    ,'Sec-Fetch-Site':'same-origin'
                    ,'Sec-Fetch-Mode':'cors'
                    ,'Sec-Fetch-Dest':'empty'
                    ,'Referer':' https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                    ,'Accept-Encoding':' gzip, deflate, br'
                    ,'Accept-Language':' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'                  
                    ,'Cookie' : this.cookies
                }
            });
          

            path = "https://hometax.go.kr/token.do?query=_kNBFP3DaqbMPKU7lHtcW&postfix="+new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate() ;
            
            var headers = result.headers;
            this.cookies += cookiegenerate(headers)+"NTS_REQUEST_SYSTEM_CODE_P=TXPP;";
            console.log("this.cookies : "+ this.cookies);

            result = await axiod({
                method: 'get',
                url: path,
                // rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
                headers:{
                    'Host': 'hometax.go.kr'
                    ,'Connection':' keep-alive'
                    ,'sec-ch-ua':' "Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                    ,'sec-ch-ua-mobile':' ?0'
                    ,'User-Agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                    ,'sec-ch-ua-platform':' "Windows"'
                    ,'Accept':' */*'
                    ,'Sec-Fetch-Site':' same-site'
                    ,'Sec-Fetch-Mode':' no-cors'
                    ,'Sec-Fetch-Dest':' script'
                    ,'Referer':' https://tewf.hometax.go.kr/'
                    ,'Accept-Encoding':' gzip, deflate, br'
                    ,'Accept-Language':' ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'                    
                    ,'Cookie' : this.cookies
                }
            });
           
            var headers = result.headers;
            this.cookies += cookiegenerate(headers)+"NTS_REQUEST_SYSTEM_CODE_P=TXPP;";
            console.log("this.cookies : "+ this.cookies);

            postData = "<map id='postParam'>"+ sliceFunc(result.data, 'nts_reqPortalCallback("', '");')+ "<popupYn>false</popupYn></map>";
            console.log("10. ********postData: "+postData);
            path = "https://tewf.hometax.go.kr/permission.do?screenId=UTEWFCBA01&domain=hometax.go.kr"
            result = await axiod({
                method: 'post',
                url: path,
                data:postData,
                // rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
                headers:{
                    'Host':'tewf.hometax.go.kr'
                    ,'Connection':'keep-alive'
                    ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                    ,'Accept':'application/xml; charset=UTF-8'
                    ,'Content-Type':'application/xml; charset=UTF-8'
                    ,'sec-ch-ua-mobile':'?0'
                    ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                    ,'sec-ch-ua-platform':'"Windows"'
                    ,'Origin':'https://tewf.hometax.go.kr'
                    ,'Sec-Fetch-Site':'same-origin'
                    ,'Sec-Fetch-Mode':'cors'
                    ,'Sec-Fetch-Dest':'empty'
                    ,'Referer':'https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                    ,'Accept-Encoding':'gzip, deflate, br'
                    ,'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                    ,'Cookie' : this.cookies
                }
            });
          
            var headers = result.headers;
            this.cookies += cookiegenerate(headers)+"NTS_REQUEST_SYSTEM_CODE_P=TXPP;";
            console.log("this.cookies : "+ this.cookies);

            // for(var i =0 ; i<cookieArr.length; i++){
            //     console.log('cookieArr[i]: '+ cookieArr[i])
            //     this.cookies += cookieArr[i]+";"
            // }
    
            console.log("==================================================================")
            console.log("11. result: "+ result.data);
            console.log("==================================================================")
    
    
    
            path = "https://tewf.hometax.go.kr/websquare//serverTime.wq?pattern=yyyy&idx=16372956765148950.479635401685";
            postData = '';
            result = await axiod({
                method: 'post',
                url: path,
                data:postData,
                // rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
                headers:{
                    'Host':'tewf.hometax.go.kr'
                    ,'Connection':'keep-alive'
                    ,'Content-Length':'0'
                    ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                    ,'sec-ch-ua-mobile':'?0'
                    ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                    ,'sec-ch-ua-platform':'"Windows"'
                    ,'Accept':'*/*'
                    ,'Origin':'https://tewf.hometax.go.kr'
                    ,'Sec-Fetch-Site':'same-origin'
                    ,'Sec-Fetch-Mode':'cors'
                    ,'Sec-Fetch-Dest':'empty'
                    ,'Referer':'https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                    ,'Accept-Encoding':'gzip, deflate, br'
                    ,'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                    ,'Cookie' : this.cookies
                }
            });
    
    
           
            path = "https://tewf.hometax.go.kr/wqAction.do?actionId=ATEWFCBA001R01&screenId=UTEWFCBA01&popupYn=false&realScreenId=";
            // postData = '<map id="ATEWFCBA001R01"><map id="searchVO"><attrYr>2020</attrYr><tin>'+tin+'</tin></map></map><nts<nts>nts>27K0k0P9LivozZcfQAGYkO0DgVsaOUlN42nQdHceIs16';
            postData = '<map id="ATEWFCBA001R01"><map id="searchVO"><attrYr>2020</attrYr><tin>'+tin+'</tin></map></map>';
            console.log(postData);
           
            var headers = result.headers;
            this.cookies += cookiegenerate(headers)+"NTS_REQUEST_SYSTEM_CODE_P=TXPP;";
            console.log("this.cookies : "+ this.cookies);

            result = await axiod({
                method: 'post',
                url: path,
                data:postData,
                // rejectUnauthorized: false,// 이거 없으면 'Hostname/IP does not match certificate's altnames' error -> TLS(https) 관련 에러인듯
                headers:{
                    'Host':'tewf.hometax.go.kr'
                    ,'Connection':'keep-alive'
                    ,'sec-ch-ua':'"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"'
                    ,'Accept':'application/xml; charset=UTF-8'
                    ,'Content-Type':'application/xml; charset=UTF-8'
                    ,'sec-ch-ua-mobile':'?0'
                    ,'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                    ,'sec-ch-ua-platform':'"Windows"'
                    ,'Origin':'https://tewf.hometax.go.kr'
                    ,'Sec-Fetch-Site':'same-origin'
                    ,'Sec-Fetch-Mode':'cors'
                    ,'Sec-Fetch-Dest':'empty'
                    ,'Referer':'https://tewf.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/wf/c/b/a/UTEWFCBA01.xml'
                    ,'Accept-Encoding':'gzip, deflate, br'
                    ,'Accept-Language':'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
                    ,'Cookie' : this.cookies
                }
            });
            
            console.log("==================================================================")
            console.log("this.cookie: "+ this.cookies);
            console.log("13. result: "+ result.data);
            console.log("==================================================================")
    
            return result.data.toString();
        }    

    
}

function cookiegenerate(headers:Headers){
    var result = "";
    for (let entry of headers.entries()) {
        if(entry[0] === 'set-cookie'){
            var cookieValue = entry[1].substring(0,entry[1].indexOf(';',0));
            result += cookieValue+";"
        }
    }
    return result;
}