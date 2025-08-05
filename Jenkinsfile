// // Jenkinsfile for CI/CD Pipeline //
// // This Jenkinsfile defines a CI/CD pipeline for a .NET application that builds, tests, and deploys the application to Docker Hub and IIS.
//ngonnnnnnnnnnn  
//  ------------------ tich hop traefik ----------------------

pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                echo 'Cloning source code'
                git branch: 'main', url: 'https://github.com/htphong23/nhahang.git'
            }
        }

        stage('Restore Packages') {
            steps {
                echo 'Restoring NuGet packages...'
                bat 'dotnet restore'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'dotnet build --configuration Release'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests...'
                bat 'dotnet test --no-build --verbosity normal'
            }
        }

        stage('Publish to Folder') {
            steps {
                echo 'Cleaning old publish folder...'
                bat 'if exist "%WORKSPACE%\\publish" rd /s /q "%WORKSPACE%\\publish"'
                echo 'Publishing to temporary folder...'
                bat 'dotnet publish -c Release -o "%WORKSPACE%\\publish"'
            }
        }

        
        
    }
}