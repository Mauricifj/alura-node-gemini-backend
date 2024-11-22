import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function createImageDescription(imageBuffer) {
    const prompt =
        'Give only one short, social media-friendly caption for this image:';

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString('base64'),
                mimeType: 'image/png',
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || 'Description not created';
    } catch (error) {
        console.error('Error creating image description:', error.message, error);
        throw new Error('Error creating image description');
    }
}

export async function createImageAlt(imageBuffer) {
    const prompt =
        'Provide only one concise and descriptive alt text for this image to help visually impaired users.';

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString('base64'),
                mimeType: 'image/png',
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || 'Alt text not created';
    } catch (error) {
        console.error('Error creating image alt text:', error.message, error);
        throw new Error('Error creating image alt text');
    }
}