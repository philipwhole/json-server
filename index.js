const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Assuming 'db.json' is your JSON data file
const middlewares = jsonServer.defaults();

// Custom middleware to handle PUT (update) requests
server.use(jsonServer.bodyParser);
server.put('/posts/:id', (req, res) => {
  // Implement your custom update logic here
  // Update the resource with ID req.params.id using req.body
  res.status(200).json({ message: 'Resource updated successfully' });
});

// Custom middleware to handle DELETE requests
server.delete('/posts/:id', (req, res) => {
  // Implement your custom delete logic here
  // Delete the resource with ID req.params.id
  res.status(204).send();
}); 

// Custom middleware to handle POST (create) requests
server.use(jsonServer.bodyParser);
server.post('/posts', (req, res) => {
  // Implement your custom create logic here
  // You can create a new resource and add it to your JSON data
  const newPost = {
    title: req.body.title,
    content: req.body.content,
  };

  // Assuming you have a 'posts' property in your JSON data file
  const db = router.db;
  db.get('posts').push(newPost).write();

  res.status(201).json(newPost); // Respond with the created resource
});


server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
