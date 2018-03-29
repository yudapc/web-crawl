var express    = require("express");
var app        = express();
var path       = require("path");
var fs         = require("fs");
var serveIndex = require('serve-index');
var cmd        = require('child_process');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html')); //__dirname : It will resolve to your project folder.
});

app.use(express.static(__dirname + "/assets"))
app.use('/assets', serveIndex(__dirname + '/assets'));

app.get('/assets/:folder/:id', function(req, res) {
  console.log('arapsm: ', req.params);
  res.sendFile(__dirname + '/assets/' +req.params['folder'] + '/'  + req.params['id']);
});

app.get('/runbot', function(req, res) {
  cmd.exec('./run_mrporter.sh', function(err, stdout, stderr) {
    if (err) {
      console.log('err: ', err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  res.json({ status: 'running' });
});

app.listen(3000);

console.log("Running at Port 3000");
