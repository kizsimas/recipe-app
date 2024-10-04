export const makeImageUrl = (imagePath: string) : string => {
    console.log(`http://${process.env.NEXT_IMG_IP}/${imagePath}`);
    return `http://${process.env.NEXT_IMG_IP}/${imagePath}`
}