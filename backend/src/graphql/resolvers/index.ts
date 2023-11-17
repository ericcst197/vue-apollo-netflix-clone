import path from 'path'
import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import DateTimeScalar from '../scalars/dateTime'

const allResolversArray = loadFilesSync(path.join(__dirname, './**/*.resolvers.*'), {
    ignoreIndex: true,
})

/*
 * GraphQL server
 */ 
// Filter out AUTH resolver to used in another server
const resolversArray = allResolversArray.filter(e => e.Name !== "Auth")

// Remove Name property in each resolver 
resolversArray.forEach(e => {
    delete e.Name
})

const resolvers = mergeResolvers([
    ...resolversArray, 
    { DateTime: DateTimeScalar }
])
/*
 * GraphQL server
 */ 

/*
 * AUTH server
 */ 
const authResolversArray = allResolversArray.filter(e => e.Name === "Auth")

authResolversArray.forEach(e => {
    delete e.Name
})

const authResolvers = mergeResolvers([
    ...authResolversArray, 
    { DateTime: DateTimeScalar }
])
/*
 * AUTH server
 */ 

// console.log('-----RESOLVERS-----')
// console.log(resolvers)
// console.log('-----RESOLVERS-----')
export {
    resolvers,
    authResolvers
}