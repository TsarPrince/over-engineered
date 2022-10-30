import AWS from 'aws-sdk'

const getPublicUrl = async (file) => {

  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  })
  
  const uploadedImage = await s3.upload({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: file.name,
    Body: file.blob,
    ACL: 'public-read'
  }).promise()
  
  return uploadedImage.Location;
}

export default getPublicUrl