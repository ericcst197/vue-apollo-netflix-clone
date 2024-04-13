import path from 'path'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { print } from 'graphql'
import fs from 'fs'

const allTypeDefsArray = loadFilesSync(path.join(__dirname), { 
    ignoreIndex: true
})

// Check if all typeDef have name property
const validTypeDef = allTypeDefsArray.every(e => {
    try {
        if(!e.name) {
            throw new Error('typeDefsArray must have a name property')
        }

        return true
    } catch (e) {
        console.log(e)
    }
})


/*
 * GraphQL server
 */ 
const typeDefsArray = allTypeDefsArray.filter(e => e.name !== 'Auth')

typeDefsArray.forEach(e => {
    delete e.Name
})

const typeDefs = mergeTypeDefs(typeDefsArray.map(e => e.type))
/*
 * GraphQL server
 */ 

/*
 * AUTH server
 */ 
const authTypeDefsArray = allTypeDefsArray.filter(e => { 
    return e.name === 'Auth' || e.name === 'User'
})

authTypeDefsArray.forEach(e => {
    delete e.Name
})

const authTypeDefs = mergeTypeDefs(authTypeDefsArray.map(e => e.type))
/*
 * AUTH server
 */ 


/** 
 * TESTING PURPOSE 
 *   Write the merge typeDefs result string into a file  
 */
// const printedTypeDefs = print(typeDefs)
// const printedAuthTypeDefs = print(authTypeDefs)

// fs.writeFileSync('main.graphql', printedTypeDefs)
// fs.writeFileSync('auth.graphql', printedAuthTypeDefs)
/** 
 * TESTING PURPOSE 
 */

export {
    validTypeDef,
    typeDefs,
    authTypeDefs,
}