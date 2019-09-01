const express = require('express')
const app = express()
var port = process.argv[2] || 80
app.use(express.json())
var os = require('os');
var hostname = os.hostname();
const date = require('date-and-time');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

 
app.get('/', (request, response) => {
  var randomNumber = getRandomInt(500, 2000)
  var remoteIP =  request.connection.remoteAddress
  
  var waitTill = new Date(new Date().getTime() + randomNumber );
  while(waitTill > new Date()){}

  var now = new Date();
  var tsStr = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  
  

  var webPageColour = "Blue"
  var rspString = {"Message": "Hello World", "Version":"V1","WebPageColour": webPageColour,"TimeStamp":tsStr,"hostname" :hostname, "remoteIP":remoteIP, "appLatencyms":randomNumber}
 
  console.log(rspString)
  response.send(rspString)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`MOTM server is listening on ${port}`)
})

/* Test Script : 
while true ; do curl localhost:8080; sleep 5 ; done
 
$(aws ecr get-login --region us-east-1 --no-include-email)
RepoECRURI=$(aws ecr create-repository --repository-name canary-app | jq -r  '.repository.repositoryUri')
echo $RepoECRURI
docker build -t canary-app-image:v1 .

docker tag canary-app-image:v1 $RepoECRURI ; docker images

docker push $RepoECRURI  


*/

