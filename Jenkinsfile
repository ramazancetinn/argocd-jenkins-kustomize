pipeline{
    agent any
    stages {
        // Docker image build stage
        stage("Build and Push Image") {
            environment {
                DOCKERHUB_CREDS = credentials("dockerhub")
            }
            steps{
                //  build the image
                sh "until docker ps; do sleep 3; done && docker build -t ramazancetin/node-app:${env.GIT_COMMIT} ."
                // push to image to repo such as dockerhub
                sh "docker login --username $DOCKERHUB_CREDS_USR --password $DOCKERHUB_CREDS_PSW && docker push ramazancetin/node-app:${env.GIT_COMMIT}"
            }
        }
        // kustomize the iamge tag and push it to repo
        stage("Deploy to Production") {
            steps{
                // removing previous clone folder
                sh "rm -rf argocd-jenkins-kustomize || true"
                //  clone the repo
                sh "git clone https://github.com/ramazancetinn/argocd-jenkins-kustomize.git"
                // add global config user for commit and pushing to repo
                sh "git config --global user.email 'jenkins@ci.com'"
                // input message:'Approve deployment?'
                dir("argocd-jenkins-kustomize") {
                    sh "git fetch && git checkout prod"
                    sh "cd ./deployment && kustomize edit set image ramazancetin/node-app:${env.GIT_COMMIT}"
                    withCredentials([usernamePassword(credentialsId: 'git', passwordVariable: 'GIT_PASS', usernameVariable: 'GIT_USER')]) {
                        sh("git commit -am 'publish new version${env.GIT_COMMIT}' && git push https://${GIT_USER}:${GIT_PASS}@github.com/ramazancetinn/argocd-jenkins-kustomize/tree/prod")
                        // https://${GIT_USER}:${GIT_PASS}@github.com/ramazancetinn/argocd-jenkins-kustomize/tree/prod
                    }
                }
            }
        }
    }
}