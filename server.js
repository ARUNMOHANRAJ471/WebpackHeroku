const express = require('express');

const app = express();

app.get('/hello', (req, res)=>{
  res.send({hi:'there'});
})
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV !== 'production') {
  const webpackmiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackmiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  })
}


app.listen(process.env.PORT || 3050, ()=>console.log('listening'));
