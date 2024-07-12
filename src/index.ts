import initApp from './app';

async function startServer() {
  const app = await initApp();
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

startServer();
