import app from './app';

const port = process.env.PORT || 3001;
app.set('port', port);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});