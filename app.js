    import http, { request } from "node:http";
    import fs from "fs/promises"
    import { stringify } from "node:querystring";
    import { writeFile } from "node:fs";

    import express from "express";
    import cors from "cors"

        // er det ikke bedre at lave den asyncron? videoen sagde man kunne ende i callback hell

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get("/users", async (req,res) => {
    
        const json= await fs.readFile("data/users.json")

        res.send(json);
    })  
        
    app.get("/posts", async (req,res) => {
    
        const json= await fs.readFile("data/posts.json")

        res.send(json);
    }) 
        
        
                
            app.post("/users", async (req,res)=>{

            const user = {
              id: new Date().getTime(),
              image: req.body.image,
              mail: req.body.mail,
              name: req.body.name,
              title: req.body.title,
            };

            
 

        // læser fra JSON
        const json = await fs.readFile("data/users.json");

        //Parse til javascript
        
            const users = JSON.parse(json);
       

        users.push(user);

        //konverterer users til JSON format
        const usersJson = JSON.stringify(users);

        //skriver til JSON fil - dvs tilføjer vores nye object
        await fs.writeFile("data/users.json", usersJson);

       
        //vise restultatet dvs hele listen
        res.send(usersJson);
            })
    
            

              
            app.post("/posts", async (req, res) => {


              const post = {
                
              id: new Date().getTime(),
              caption: req.body.caption,
              createdAt: req.body.createdAt,
              image: req.body.image,
              uid: req.body.uid,
            };
   
              // læser fra JSON
              const json = await fs.readFile("data/posts.json");

              //Parse til javascript

              const posts = JSON.parse(json);

              posts.push(post);

              //konverterer users til JSON format
              const postsJson = JSON.stringify(posts);

              //skriver til JSON fil - dvs tilføjer vores nye object
              await fs.writeFile("data/posts.json", postsJson);

              //vise restultatet dvs hele listen
              res.send(postsJson);
            });

    const port = 3000;
    app.listen(port, ()=> {
        console.log(`Serveren kører på http://localhost:${port}`);
    });