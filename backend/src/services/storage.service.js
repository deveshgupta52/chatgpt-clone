import ImageKit from '@imagekit/nodejs';


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});


export async function uploadFile({ buffer, fileName, folder = "chatgpt" }) {
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })

    return result
}