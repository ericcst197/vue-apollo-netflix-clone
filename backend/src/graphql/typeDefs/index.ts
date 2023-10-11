import path from 'path'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { print } from 'graphql'
import fs from 'fs'

/**
 * Import all files from the specified gql folder.
 */
const loadedFiles = loadFilesSync(path.join(__dirname), { 
    ignoreIndex: true
})
 
/**
 * Merge all possible types, interfaces, enums and unions, without conflicts.
 */
const typeDefs = mergeTypeDefs(loadedFiles)

/**
 * Print the merged typeDefs result as a string 
 */
const printedTypeDefs = print(typeDefs)

// Write the merge typeDefs result string into a file 
// fs.writeFileSync('joined.graphql', printedTypeDefs)


export default typeDefs