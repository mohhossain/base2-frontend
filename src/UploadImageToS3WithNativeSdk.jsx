import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='thebase2stuffs';
const REGION ='us-east-1';


AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = ({image, setUrl}) => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
                else {
                myBucket.getSignedUrl('getObject', {Bucket: S3_BUCKET, Key: file.name}, (err, url) => {
                    if (err) console.log(err)
                    else {
                        console.log(url)
                        setImageUrl(url)
                    }
                })
            }
            })
    }


    return
    <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(image)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;