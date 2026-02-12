import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
export async function POST(req) {
    // Create a new document
    const data = await req.formData();
    const file = data.get('file');


    if (file) {
        
        const s3Client = new S3Client({
         region: 'eu-north-1' ,
         credentials: {
             accessKeyId:process.env.AWS_ACCESS_KEY_ID,
             secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
         }
        });

        let ext = file.name.split('.').slice(-1)[0];
        const fileName = `${uuidv4()}.${ext}`;
        console.log(fileName);
        
         
        let chanks=[];

        for await (const chunk of file.stream()) {
            chanks.push(chunk);                
        }
        const buffer = Buffer.concat(chanks);
        
        
      const bucketname = 'food-ordering-by-kunal';


      await s3Client.send(new PutObjectCommand({

             Bucket: bucketname,
             Key: fileName,
             ACL: 'public-read',
             ContentType: file.type,
             Body: buffer,

        }))

    
    const link = `https://${bucketname}.s3.amazonaws.com/${fileName}`;

    return Response.json(link);

    } 

    return Response.json(true);
}