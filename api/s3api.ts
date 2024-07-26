import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const aws = new S3Client({region: "ru-central1",
    endpoint: "https://storage.yandexcloud.net",
    credentials: {accessKeyId: process.env.NEXT_PUBLIC_ACCESKEY! || process.env.ACCESKEY!,
         secretAccessKey: process.env.NEXT_PUBLIC_SECRETKEY! || process.env.SECRETKEY!}}) 

export const s3api = {
    uploadFile: async (id:string, file:any)=>{
        const params = {
            Bucket: "mirsulcb", // Имя бакета, например 'sample-bucket-101'.
            Key: `images/${id}.jpg`, // Имя объекта, например 'sample_upload.txt'.
            Body: file, // Содержимое объекта, например 'Hello world!".
            };
        
            return new Promise((resolve, reject)=>{
                aws.send(new PutObjectCommand(params), (error, data)=>{
                    if(error){
                        console.log(error)
                        reject(error);
                    }
                    if(data){
                        console.log(data)
                        resolve(data.$metadata.httpStatusCode);
                    }
                })
    
            })
           
    },

    deleteFile: async (id:string) => {
        const params = {
            Bucket: "mirsulcb", // Имя бакета, например 'sample-bucket-101'.
            Key: `images/${id}.jpg`, // Имя объекта, например 'sample_upload.txt'.
            };

            await aws.send(new DeleteObjectCommand(params))
    }
}