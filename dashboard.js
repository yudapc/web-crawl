var express    = require("express");
var app        = express();
var path       = require("path");
var fs         = require("fs");
var serveIndex = require('serve-index');
var cmd        = require('child_process');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/dashboard-layout/index.html')); //__dirname : It will resolve to your project folder.
});

app.use(express.static(__dirname + "/assets"))
app.use('/assets', serveIndex(__dirname + '/assets'));

app.get('/assets/:folder/:keyword/:id', function(req, res) {
  console.log('req params', req.params);
  res.sendFile(__dirname + '/assets/' + req.params['folder'] + '/' + req.params['keyword'] + '/'  + req.params['id']);
});

app.get('/runbot', function(req, res) {
  var keyword = req.param('q');
  console.log('keyword: ', keyword);
  var commandLine = `./run_mrporter.sh ${keyword}`;
  console.log('commandLine: ', commandLine);
  cmd.exec(commandLine, function(err, stdout, stderr) {
    if (err) {
      console.log('err: ', err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  res.json({ status: 'running' });
});

app.get('/clearall', function(req, res) {
  var commandLine = './run_clear_all.sh';
  cmd.exec(commandLine, function(err, stdout, stderr) {
    if (err) {
      console.log('err: ', err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  res.json({ status: 'clear all...' });
});

app.listen(3000);

console.log("Running at Port 3000");
