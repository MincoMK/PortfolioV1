pipeline {
    agent any
	environment {
		NAME = "portfv1"
		PORT="9034"
		CI = false
	}
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh "npm install --save-dev --legacy-peer-deps"
                sh "npm run build"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh "npm run test"
            }
        }
        stage("Purge") {
            steps {
                echo "Purging..."
                sh "docker ps --format \"{{.Names}}\" | grep ${env.NAME} | tee \\>\\(xargs --no-run-if-empty docker stop\\) \\>\\(xargs --no-run-if-empty docker rm\\) || true"
				sh "docker container prune"
                sh 'docker ps -q -f status=exited | xargs --no-run-if-empty docker rm -f'
                sh "docker rm ${env.NAME} -f || true"
                sh 'docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi -f'
                sh 'docker volume ls -qf dangling=true | xargs -r docker volume rm'
                sh 'docker rm `docker ps --no-trunc -aq -f status=exited` || true'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh "docker build -t ${NAME} ."
                sh "docker run --restart -d -p ${env.PORT}:${env.PORT} --name ${env.NAME} ${env.NAME}"
            }
        }
    }
}
