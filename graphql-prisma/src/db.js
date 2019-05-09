 // Demo data
 let users = [{
         id: '1',
         name: 'Mike',
         email: 'mike@gmail.com',
         age: 38
     },
     {
         id: '2',
         name: 'John',
         email: 'john@gmail.com',
         age: 27
     },
     {
         id: '3',
         name: 'Sarah',
         email: 'sarah@gmail.com',
         age: 29
     }
 ]

 let posts = [

     {
         id: '1',
         title: 'GraphQL bootcamp.',
         body: 'Learn how to setup a GraphQL with Nodejs',
         published: true,
         author: '1'
     },
     {
         id: '2',
         title: 'React tutorial',
         body: 'Learn how to build front end client with React',
         published: true,
         author: '2'

     },
     {
         id: '3',
         title: 'Gatsby starter.',
         body: 'Learn how to create a super fast Gatsby with GraphQL site.',
         published: false,
         author: '3'
     }
 ]

 let comments = [{
         id: '1',
         text: 'Awesome post man!',
         author: '3',
         post: '1'
     },
     {
         id: '2',
         text: 'Great tutorial, cool stuff!',
         author: '1',
         post: '3'
     },
     {
         id: '3',
         text: 'This one sucks big time!',
         author: '2',
         post: '2'
     },
     {
         id: '4',
         text: 'Gatsby is the best!',
         author: '1',
         post: '3'
     }
 ]

 const db = {
     users,
     posts,
     comments
 }

 export default db