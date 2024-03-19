export function formatCamelCaseToSentence(str: string) {
    let result = str.replace(/([A-Z])/g, ' $1').trim()
    return result.charAt(0).toUpperCase() + result.slice(1)
}
