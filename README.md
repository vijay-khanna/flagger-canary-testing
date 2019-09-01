This is a demo of Flagger using Prometheus

# Have a EKS Cluster ready before hand.

* **Setup**
```
cd ~/environment
git clone https://github.com/vijay-khanna/flagger-canary-testing.git
cd flagger-canary-testing/sample-app/canary-app/v1/

$(aws ecr get-login --region us-east-1 --no-include-email)
RepoECRURI=$(aws ecr create-repository --repository-name canary-app | jq -r  '.repository.repositoryUri')
echo $RepoECRURI

docker build -t canary-app-image:v1 .
docker tag canary-app-image:v1 $RepoECRURI ; docker images
docker push $RepoECRURI  

```
