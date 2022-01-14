


      
    export const login = async ({ request, response }: { request: any, response: any }) => {
        const {value} = await request.body({type:"form-data"});
        const formData = await value.read();

        const name = formData.fields.userName;
        console.log("Login function parameter");
        console.log("name: "+ name);
        
        response.status = 200;
        response.body = "정상로그인 확인되었습니다.";
        
    };

