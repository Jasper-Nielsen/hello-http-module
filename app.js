import http, { request } from "node:http";
import fs from "fs/promises"
import { stringify } from "node:querystring";
import { writeFile } from "node:fs";


    // er det ikke bedre at lave den asyncron? videoen sagde man kunne ende i callback hell

const app = http.createServer(async (request, response) => {
    if (request.url === "/" && request.method==="GET") {

response.statusCode = 200; //bestemme om HTTP request er fuldført
response.setHeader("Content-Type", "text/plain"); //fortæller server om datatype den ønsker som response
 response.end("Working with HTTP");
}
else if(request.url==="/users" && request.method==="GET"){
      response.statusCode = 200; //bestemme om HTTP request er fuldført
      response.setHeader("Content-Type", "application/json"); //fortæller server om datatype den ønsker som response
     
      const json= await fs.readFile("data/users.json")

     response.end(json);
    } 
    
    else if(request.url==="/posts" && request.method==="GET"){
        response.statusCode = 200; //bestemme om HTTP request er fuldført
        response.setHeader("Content-Type", "application/json"); //fortæller server om datatype den ønsker som response
       

       const json= await fs.readFile("data/posts.json")

        response.end(json);
    }
    else if (request.url==="/users" && request.method==="POST"){
        

       const user = {
        id: new Date().getTime(),
        image: "url",
        mail: "tester@test.dk",
        name: "test user",
        title: "Tester"
       };

       // læser fra JSON
       const json = await fs.readFile("data/users.json");

       //Parse til javascript
       
        const users = JSON.parse(json);
       console.log(users)

       users.push(user);

       //konverterer users til JSON format
       const usersJson = JSON.stringify(users);

       //skriver til JSON fil - dvs tilføjer vores nye object
       await fs.writeFile("data/users.json", usersJson);

       response.statusCode = 200;
       response.setHeader("Content-Type", "application/json");

       response.end(usersJson);
    };

    
    
});

const port = 3000;
app.listen(port, ()=> {
    console.log(`Serveren kører på http://localhost:${port}`);
});