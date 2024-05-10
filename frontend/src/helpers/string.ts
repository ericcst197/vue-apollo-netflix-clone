export function formatCamelCaseToSentence(str: string) {
    let result = str.replace(/([A-Z])/g, ' $1').trim()
    return result.charAt(0).toUpperCase() + result.slice(1)
}

// Function to convert image file to Base64
export async function convertImageToBase64(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', imagePath, true);
        xhr.responseType = 'blob';

        xhr.onload = () => {
            if (xhr.status === 200) {
                const reader = new FileReader();
                reader.readAsDataURL(xhr.response);
                reader.onload = () => {
                    resolve(reader.result as string);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
            } else {
                reject(new Error('Failed to load image'));
            }
        };

        xhr.onerror = (error) => {
            reject(error);
        };

        xhr.send();
    });
}
