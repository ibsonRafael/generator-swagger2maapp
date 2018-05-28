import hudson.util.Secret
import org.apache.commons.io.FileUtils

pipeline {
  agent any
  environment {
        TFS_USUARIO = "dev1@symbioz.com.br"
        TFS_SENHA = "Marcel0785"

        TFS_USUARIO = "dev1@symbioz.com.br"
        TFS_SENHA = "Marcel0785"
    }

  stages {
    stage('Preparacao') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      parallel {
        stage('Get TFS') {
          steps {
            echo "${params.MESCLAR_DEV}"
            echo "${params.EXEC_NG_TEST}"
            echo "${params.EXEC_BROWSER_TEST}"
            echo "${params.EXEC_NUNIT_TEST}"
            echo "${params.GERAR_DOCS}"
            checkout([$class: 'TeamFoundationServerScm', credentialsConfigurer: [$class: 'AutomaticCredentialsConfigurer'], projectPath: '$/MedTime/MedTime-Homologacao/Medtime.Web/', serverUrl: 'https://symbioz.visualstudio.com/', useOverwrite: true, useUpdate: true, workspaceName: 'Hudson-front-Homologa-${JOB_NAME}-${NODE_NAME}'])
          }
        }
        stage('Clone Git') {
          steps {
            checkout changelog: false, poll: false, scm: [$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'homologacao']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '9d6a423a-a48c-4f0e-8bf6-3bb615b9d1f2',  name: 'origin', refspec: 'master', url: 'https://symbiozmedtime@medtimewebclient.scm.azurewebsites.net:443/medtimewebclient.git']]]
          }
        }
      }
    }

    stage('Preparando Ambiente') {
      steps {
        bat 'npm install @angular/cli'
        bat 'npm install @compodoc/compodoc'
        bat 'npm install jsdoc angular-jsdoc'
        bat 'npm install protractor'
      }
    }

    stage('Dependencias') {
      steps {
        bat 'npm install'
      }
    }

    stage('NG Tests') {
      steps {
        echo '@TODO Rodar testes via Jasmine/Karma/Mocha'
      }
    }

    stage('UI Test') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      parallel {
        stage('UI Test') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            script {
              try {
                if (params.EXEC_BROWSER_TEST) {
                    echo '@TODO: Implementar/Rodar testes do Seleniun usando o NUnit'
                    //bat "cmd /c nunit3-console \"C:\\Users\\MT4-PC\\Documents\\Visual Studio 2017\\Projects\\UnitTestProject1\\UnitTestProject1\\bin\\Release\\UnitTestProject1.dll\" --result \"${WORKSPACE}\\result.xml\""
                    //nunit testResultsPattern: 'C:\\Temp\\result.xml'
                } else {
                    currentBuild.result = 'ABORTED'
                }
              } catch (Exception ex) {
                  echo '@TODO: Implementar/Rodar testes do Seleniun usando o NUnit'
                  // nunit testResultsPattern: 'result.xml'
                  // throw ex
              }
            }
          }
        }
        stage('Firefox') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            echo '@TODO: Implementar/Rodar testes do Seleniun usando o Firefox'
            //ng e2e --target=production --config=./protractor.conf.js --port=8081 --aot=false --verbose=true
          }
        }
        stage('Chrome') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            echo '@TODO: Implementar/Rodar testes do Seleniun usando o Chrome'
            //ng e2e --target=production --config=./protractor.conf.js --port=8081 --aot=false --verbose=true
          }
        }
        stage('Edge') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            echo '@TODO: Implementar/Rodar testes do Seleniun usando o Edge'
            //ng e2e --target=production --config=./protractor.conf.js --port=8081 --aot=false --verbose=true
          }
        }
        stage('Internet Explorer') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            echo '@TODO: Implementar/Rodar testes do Seleniun usando o InternetExplore (Com byPass)'
            //ng e2e --target=production --config=./protractor.conf.js --port=8081 --aot=false --verbose=true
          }
        }
      }
    }

    stage('Definindo Configs') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      steps {
        echo '@TODO: Redefinir web.config para a Homologação'
        echo '@TODO: Redefinir AppSettings.ts para a Homologação'
      }
    }

    stage('Build') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      steps {
        bat "node ${WORKSPACE}\\node_modules\\@angular\\cli\\bin\\ng build --target=production --aot=false --verbose=true"
        powershell "Copy-Item ${WORKSPACE}\\dist\\* ${WORKSPACE}\\homologacao\\ -Recurse -Force"
      }
    }

    stage('Build Docs') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      parallel {
        stage('Compodoc') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            bat "node ${WORKSPACE}\\node_modules\\@compodoc\\compodoc\\bin\\index-cli.js ${WORKSPACE}\\src  --tsconfig tsconfig.json --output .\\doc\\global"
            // powershell "Copy-Item ${WORKSPACE}\\doc\\global\\* M:\\TI\\Desenvolvimento\\Docs\\Compodoc\\ -Recurse -Force"
          }
        }
        stage('JSDoc') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            bat "node ${WORKSPACE}\\node_modules\\jsdoc\\jsdoc.js --configure ${WORKSPACE}\\node_modules\\angular-jsdoc\\common\\conf.json --template ${WORKSPACE}\\node_modules\\angular-jsdoc\\angular-template --destination ${WORKSPACE}\\build\\docs\\jsdoc --readme README.md --recurse src\\app\\medtime\\"
            // powershell "Copy-Item ${WORKSPACE}\\build\\docs\\jsdoc\\* M:\\TI\\Desenvolvimento\\Docs\\JSDoc\\ -Recurse -Force"
          }
        }
        stage('Lint Report') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            powershell 'ls'
            bat "node ${WORKSPACE}\\node_modules\\@angular\\cli\\bin\\ng lint --type-check=true --force=true --format=stylish > ${WORKSPACE}\\lint.log"
            // powershell "Copy-Item ${WORKSPACE}\\lint.log M:\\TI\\Desenvolvimento\\Docs\\Lint\\Lint-Homolocagao.txt -Recurse -Force"
          }
        }
      }
    }

    stage( 'Deploy' ) {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      steps {
        dir( 'homologacao' ) {
            powershell 'git config credential.helper store'

            powershell 'git config user.email "gate.keeper@medtime.co"'
            powershell 'git config user.name "Jenkins"'

            powershell 'git add .'
            powershell 'git commit -m ((Get-Date -Format "dd/MM/yyyy") + " - Deploy automatizado via Jenkins")'

            powershell 'git push https://username:password@myrepository.biz/file.git --all'
        }
      }
    }
  }
}














obter_projeto_git:

import hudson.util.Secret
import org.apache.commons.io.FileUtils

pipeline {
  agent any
  environment {

      GIT_USUARIO = 'ibson'
      GIT_SENHA = 'Marcel0785'

      GIT_SITE = "https://${GIT_USUARIO}:${GIT_SENHA}@symbioz.visualstudio.com/MedTime/_git"
      GIT_REPOSITORIO_BACKEND  = '/MedTime.Backend'
      GIT_REPOSITORIO_FRONTEND = '/MedTime.Frontend'

      BRANCH_DESENVOLVIMENTO_BACKEND = "develop"
      BRANCH_HOMOLOGACAO_BACKEND = "release"
      BRANCH_PRODUCAO_BACKEND = "main"

      BRANCH_DESENVOLVIMENTO_FRONTEND = "develop"
      BRANCH_HOMOLOGACAO_FRONTEND = "release"
      BRANCH_PRODUCAO_FRONTEND = "main"

      AREA_TRABALHO_NOME = 'MedTime'
      AREA_TRABALHO = "C:\\Users\\mt1\\.jenkins\\workspace\\MedTime.Publicacao\\"
      AREA_TRABALHO_BACKEND = "${AREA_TRABALHO}MedTime\\"
      AREA_TRABALHO_FRONTEND = "${AREA_TRABALHO}MedTime.Web\\"
  }

  stages{
        stage ('Clonando Repositório') {
            steps {
                script{
                    COMANDO = "${GIT} clone "

                    if (AREA == "Backend") {
                        COMANDO = "${COMANDO} ${GIT_SITE}${GIT_REPOSITORIO_BACKEND} " + defineDiretorio(AREA)
                    } else {
                        COMANDO = "${COMANDO} ${GIT_SITE}${GIT_REPOSITORIO_FRONTEND} " + defineDiretorio(AREA)
                    }

                    try{
                        withCredentials([usernamePassword(credentialsId: '9d6a423a-a48c-4f0e-8bf6-3bb615b9d1f2', passwordVariable: 'Marcel0785', usernameVariable: 'ibson_sod@hotmail.com')]) {
                            bat "${COMANDO}"
                        }
                    } catch (exception) {}
                }
            }
        }

        stage ('Alternando Branch') {
            steps {
                script{
                    dir( defineDiretorio(AREA) ) {
                        COMANDO = "${GIT} checkout "
                        if (AMBIENTE.equals("Desenvolvimento")) {
                            COMANDO = "${COMANDO} " + ( (AREA == "Backend") ? BRANCH_DESENVOLVIMENTO_BACKEND : BRANCH_DESENVOLVIMENTO_FRONTEND )
                        }
                        else if (AMBIENTE.equals("Homologação")) {
                            COMANDO = "${COMANDO} " + ( (AREA == "Backend") ? BRANCH_HOMOLOGACAO_BACKEND : BRANCH_HOMOLOGACAO_FRONTEND )
                        }
                        else {
                            COMANDO = "${COMANDO} " + ( (AREA == "Backend") ? BRANCH_PRODUCAO_BACKEND : BRANCH_PRODUCAO_FRONTEND )
                        }
                        try {
                            withCredentials([usernamePassword(credentialsId: '9d6a423a-a48c-4f0e-8bf6-3bb615b9d1f2', passwordVariable: 'Marcel0785', usernameVariable: 'ibson_sod@hotmail.com')]) {
                                bat "${COMANDO}"
                            }
                        } catch (exception) {}
                    }
                }
            }
        }

        stage ('Obtendo arquivos') {
            steps {
                dir( defineDiretorio(AREA) ) {
                    script{
                        COMANDO = "${GIT} pull"
                        try {
                            withCredentials([usernamePassword(credentialsId: '9d6a423a-a48c-4f0e-8bf6-3bb615b9d1f2', passwordVariable: 'Marcel0785', usernameVariable: 'ibson_sod@hotmail.com')]) {
                                bat "${COMANDO}"
                            }
                        } catch (exception) {}
                    }
                }
            }
        }

        stage ('Removendo arquivos') {
            steps {
                dir( defineDiretorio(AREA) ) {
                    script{
                        try {
                            withCredentials([usernamePassword(credentialsId: '9d6a423a-a48c-4f0e-8bf6-3bb615b9d1f2', passwordVariable: 'Marcel0785', usernameVariable: 'ibson_sod@hotmail.com')]) {
                                bat "for /f %F in ('dir /b /a-d ^| findstr /vile \".git .gitignore\"') do del \"%F\""
                                bat "for /f %D in ('dir /b /a:d ^| findstr /vile \".git .gitignore\"') do rmdir /S /Q \"%D\""
                            }
                        } catch (exception) {}
                    }
                }
            }
        }
    }
}
def defineDiretorio(IN_AREA) {
    DIRETORIO = ''
    if (IN_AREA == "Backend") {
        DIRETORIO = "${AREA_TRABALHO_BACKEND}"
    } else {
        DIRETORIO = "${AREA_TRABALHO_FRONTEND}"
    }
    return DIRETORIO
}









publicar_projeto_git



post {
    failure {
      // notify users when the Pipeline fails
      mail to: 'team@example.com',
          subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
          body: "Something is wrong with ${env.BUILD_URL}"
    }
  }













withCredentials([usernamePassword(credentialsId: 'git-pass-credentials-ID', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
    sh("git tag -a some_tag -m 'Jenkins'")
    sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@<REPO> --tags')
}







[archive, bat, build, catchError, checkout, deleteDir, dir, dockerFingerprintFrom, dockerFingerprintRun, echo, emailext, emailextrecipients, envVarsForTool, error, fileExists, getContext, git, input, isUnix, jiraComment, jiraIssueSelector, jiraSearch, junit, library, libraryResource, load, mail, milestone, node, parallel, powershell, properties, publishHTML, pwd, readFile, readTrusted, resolveScm, retry, script, sh, slackSend, sleep, stage, stash, step, svn, timeout, timestamps, tm, tool, unarchive, unstash, validateDeclarativePipeline, waitUntil, withContext, withCredentials, withDockerContainer, withDockerRegistry, withDockerServer, withEnv, withNPM, wrap, writeFile, ws] or symbols [all, allOf, always, ant, antFromApache, antOutcome, antTarget, any, anyOf, apiToken, architecture, archiveArtifacts, artifactManager, authorizationMatrix, azureCLI, azureDownload, azureFunctionAppPublish, azureServicePrincipal, azureUpload, azureWebAppPublish, batchFile, bitbucket, booleanParam, branch, buildButton, buildDiscarder, buildParameter, caseInsensitive, caseSensitive, certificate, changelog, changeset, checkoutToSubdirectory, choice, choiceParam, cleanWs, clock, cloud, command, configFile, configFileProvider, copyArtifacts, credentials, cron, crumb, defaultView, demand, disableConcurrentBuilds, disableResume, docker, dockerCert, dockerfile, downloadSettings, downstream, dumb, durabilityHint, envVars, environment, expression, file, fileParam, filePath, fingerprint, frameOptions, freeStyle, freeStyleJob, fromScm, fromSource, git, github, githubPush, gradle, headRegexFilter, headWildcardFilter, hyperlink, hyperlinkToModels, inheriting, inheritingGlobal, installSource, jdk, jdkInstaller, jgit, jgitapache, jnlp, jobName, label, lastCompleted, lastDuration, lastFailure, lastGrantedAuthorities, lastStable, lastSuccess, lastSuccessful, latestSavedBuild, legacy, legacySCM, list, local, location, logRotator, loggedInUsersCanDoAnything, masterBuild, maven, maven3Mojos, mavenErrors, mavenMojos, mavenWarnings, modernSCM, msbuild, msbuildError, msbuildWarning, myView, node, nodeProperties, nonInheriting, nonStoredPasswordParam, none, not, nunit, overrideIndexTriggers, paneStatus, parameters, password, pattern, permalink, pipeline-model, pipelineTriggers, plainText, plugin, pollSCM, projectNamingStrategy, proxy, queueItemAuthenticator, quietPeriod, remotingCLI, run, runParam, schedule, scmRetryCount, search, security, shell, skipDefaultCheckout, skipStagesAfterUnstable, slave, sourceRegexFilter, sourceWildcardFilter, specific, sshUserPrivateKey, stackTrace, standard, status, string, stringParam, swapSpace, text, textParam, tmpSpace, toolLocation, unsecured, upstream, usernameColonPassword, usernamePassword, viewsTabBar, weather, withAnt, workspace, zfs, zip] or globals [currentBuild, docker, env, params, pipeline, scm]



