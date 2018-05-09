'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var fs = require('fs');
var http = require('http');
var https = require('https');
var URL = require('url-parse');
var sync = require('deasync');
var SwaggerParser = require('swagger-parser');


module.exports = Generator.extend({

    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to use the official ' + chalk.green('Swagger') + ' to Modern ' + chalk.red('Angular 5 ') + chalk.blue('ES Module')  + ' App generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'swaggerURL',
            message: 'Please type URL to Swagger spec:'
        }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },

    parsing: function () {
        // Init variables
        var generator = this;
        var done = this.async();
        var log = this.log;
        var swaggerURL = this.props.swaggerURL;
        SwaggerParser.validate(swaggerURL, function (err, swaggerApi) {
            if (err) {
                log(err);
                done(err);
            } else {
                // Bind parsed swaggerApi to Generator instance
                var api = generator.api = swaggerApi;
                log('API name: %s, Version: %s', api.info.title, api.info.version);

                var tags = generator._tags = [];
                for (var path in api.paths) {
                    for(var method in api.paths[path]) {
                        // console.log("\t" + method + " tag:" + api.paths[path][method].tags[0]);
                        if(tags.indexOf(api.paths[path][method].tags[0]) == -1) {
                            tags.push(api.paths[path][method].tags[0]);
                        }
                    }
                }
                //console.log(tags);
                log('\t%s sub-contexts candidates found...\n', tags.length);

                var components = {};
                for (var tag in tags) {
                    components[tags[tag]] = [];
                }

                for (var tag in tags) {
                    for (var path in api.paths) {
                        for(var method in api.paths[path]) {
                            if (tags[tag] == api.paths[path][method].tags[0]) {
                                var operation = api.paths[path][method];
                                operation['method'] = method;
                                components[tags[tag]].push(operation);
                            }
                        }
                    }
                }
                api['components'] = components;
                // console.log(components);


                for (var definition in api.definitions) {
                    api.definitions[definition]['attributes'] = [];
                    api.definitions[definition]['originalAttributes'] = [];

                    var modelName = definition.split('.');
                    modelName = modelName[modelName.length-1];
                    modelName = modelName + '.model.ts';
                    api.definitions[definition]['modelName'] = (modelName.replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, ""));

                    for (var attributes in api.definitions[definition].properties) {
                        api.definitions[definition]['originalAttributes'].push(attributes);
                        api.definitions[definition]['attributes'].push(attributes.charAt(0).toLowerCase() + attributes.slice(1));
                    }
                }
                //console.log(api.definitions);


                done();
            }
        });
    },

    writing: function () {
        // Init variables
        var generator = this;
        var log = generator.log;
        var swaggerURL = generator.props.swaggerURL;
        var swaggerFilePath = generator.destinationPath('spec/swagger.json');
        var swaggerFileStream;
        //
        // try {
        //     // Make spec folder
        //     fs.mkdirSync('spec');
        // } catch (err) {
        //     log('Folder already exists');
        // }
        //
        // swaggerFileStream = fs.createWriteStream(swaggerFilePath);
        // // Parsing URL
        // var url = new URL(swaggerURL);
        // // Coping original spec from URL
        // if (url.protocol === 'https:') {
        //     sync(https.get(swaggerURL).pipe(swaggerFileStream));
        // } else if (url.protocol === 'http:') {
        //     sync(http.get(swaggerURL).pipe(swaggerFileStream));
        // } else {
        //     // @TODO Add possibility to use a local file using or the path testing if files exists file://
        //     log('Please provide proper URL (http/https).');
        // }

        //### Generate files - BEGIN ##########################################################################/
        var basePath = './';

        // Creating dockers containers (Dockerfile)
            // RabbitMQ (Event Bus)
            // MariaDB|MySql|MSSql|Oracle (Database SQL)
            // MongoDB (Database NoSQL)
            // Redis (Cache/Key storing)
            // Back-End (C#|PHP Lumen|Java Spring API)
            // Front-End (Angular)
            // Logstash
            // Elastic Search


        // Creating dockers compuser (yaml)

        // Creating Angular folders
        var angularModule = 'Unknow';
        if (typeof(generator.api['x-module']) != 'undefined' && generator.api['x-module'] != null && generator.api['x-module'] != ''){
            angularModule = generator.api['x-module'];
        }
        var angularPath = basePath + 'front-end/src/' + angularModule + '/';

        var angularInterface = 'entities/interface/';
        var angularModels    = 'entities/models/';
        var angularComponents= 'components/';
        var angularMensager  = 'menssager/';

        // Generating models
        for (var definition in generator.api.definitions) {
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Creating interface: ' + chalk.yellow(angularPath + angularInterface + generator.api.definitions[definition]['modelName']) + '');
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Creating model:     ' + chalk.yellow(angularPath + angularModels + generator.api.definitions[definition]['modelName']) + '');
        }

        // Generating components
        for (var component in generator.api.components) {
            var componentName = (component.replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, ""))
            componentName = componentName + '';
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Creating Smart Component: ' + chalk.yellow(  angularPath + angularComponents + componentName + '.component.ts') );
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '     Creating Dumb Component: ' + chalk.yellow(angularPath + angularComponents + componentName + '-list.component.ts'));
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '     Creating Dumb Component: ' + chalk.yellow(angularPath + angularComponents + componentName + '-edit.component.ts'));
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '     Creating Dumb Component: ' + chalk.yellow(angularPath + angularComponents + componentName + '-view.component.ts'));
        }

        // Creating actions
        for(var tag in generator._tags) {
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Creating actions and effects for: ' + chalk.red(generator._tags[tag]) + '');

            var actionPath = generator._tags[tag];
            actionPath = angularPath + angularMensager + (actionPath.replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")) + '-messager/';

            var actionTypeEnumName = generator._tags[tag] + 'ActionTypes';
            var actionTypeEnumFileName = (actionTypeEnumName.replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")) + '.ts';

            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '    Action Types: ' + chalk.yellow(actionTypeEnumName) + ' on ' + chalk.yellow(actionPath + actionTypeEnumFileName));

            for (var path in generator.api.paths) {
                for (var method in generator.api.paths[path]) {
                    if (generator._tags[tag] == generator.api.paths[path][method].tags[0]) {
                        var operation = generator.api.paths[path][method];
                        var basename = operation.operationId;
                        log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '    For operation: ' + chalk.red(basename) + '');
                        basename = (basename.replace(/\.?([A-Z]+)/g, function (x, y) {
                            return "-" + y.toLowerCase()
                        }).replace(/^-/, ""));

                        var actionname = basename + '.actions.ts';
                        var effectname = basename + '.effects.ts';
                        log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '      ' + chalk.yellow(actionPath + actionname) + '');
                        log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '      ' + chalk.yellow(actionPath + effectname) + '');

                        actionname = basename + '-done.actions.ts';
                        effectname = basename + '-done.effects.ts';
                        log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '      ' + chalk.yellow(actionPath + actionname) + '');
                        log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '      ' + chalk.yellow(actionPath + effectname) + '');

                        actionname = basename + '-error.actions.ts';
                        effectname = basename + '-error.effects.ts';
                        log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '      ' + chalk.yellow(actionPath + actionname) + '');
                        log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '      ' + chalk.yellow(actionPath + effectname) + '');
                    }
                }
            }
        }


        // Generating module
        // Generating routing module

        /**
         * -- > Probed
         * ** > from config
         * == > Default config
         * ++ > from command line
         * !! > Notice
         * II > Information
         * WW > Warning
         * EE > Error
         * NI -> Not implemenmted
         * ?? > Unknow
         */

        // Creating ES7 Business Module folders
        // Generating commands classes
        log(chalk.blue( '(II) ') + chalk.blue('[es6 module]') + '  Creating modules');
        log(chalk.green('(==) ') + chalk.blue('[es6 module]') + '    Creating module: ' + chalk.yellow('HttpBaseClient') + '');

        for(var tag in generator._tags) {
            var componentname = (generator._tags[tag].replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, ""))
            componentname = componentname + '.module.js';
            log(chalk.blue('(II) ') + chalk.blue('[es6 module]') + '    Creating module: ' + chalk.yellow(componentname) + '');

            for (var path in generator.api.paths) {
                for (var method in generator.api.paths[path]) {
                    if (generator._tags[tag] == generator.api.paths[path][method].tags[0]) {
                        var operation = generator.api.paths[path][method];
                        var basename = operation.operationId;
                        basename = (basename.replace(/\.?([A-Z]+)/g, function (x, y) {
                            return "-" + y.toLowerCase()
                        }).replace(/^-/, ""));

                        var commandname = basename + '-command.js';
                        log(chalk.blue('(II) ') + chalk.blue('[es6 module]') + '      Creating Command Class ' + chalk.yellow(commandname) + '');
                    }
                }
            }
        }

        // Generating module


        // Creating C# solution folders
        // Creating C# models
        // Creating C# controllers

        //### Generate files - END ############################################################################/

    //     // Copy files
    //     generator.fs.copy(
    //         generator.templatePath('.gitignore'),
    //         generator.destinationPath('.gitignore')
    //     );

    //     fs.mkdirSync('.meteor');
    //     generator.fs.copy(
    //         generator.templatePath('.meteor/packages'),
    //         generator.destinationPath('.meteor/packages')
    //     );
    //     generator.fs.copy(
    //         generator.templatePath('.meteor/platforms'),
    //         generator.destinationPath('.meteor/platforms')
    //     );
    //     generator.fs.copy(
    //         generator.templatePath('.meteor/release'),
    //         generator.destinationPath('.meteor/release')
    //     );
    //     // Copy templates
    //     generator.fs.copyTpl(
    //         generator.templatePath('package.json'),
    //         generator.destinationPath('package.json'),
    //         {
    //             appName: generator.appname
    //         }
    //     );

    //     fs.mkdirSync('server');
    //     generator.fs.copyTpl(
    //         generator.templatePath('server/api.js'),
    //         generator.destinationPath('server/api.js'),
    //         {
    //             api: generator.api
    //         }
    //     );
    //     generator.fs.copyTpl(
    //         generator.templatePath('server/routes.js'),
    //         generator.destinationPath('server/routes.js'),
    //         {
    //             api: generator.api
    //         }
    //     );
    //     if (generator.api.definitions) {
    //         generator.fs.copyTpl(
    //             generator.templatePath('server/definitions.js'),
    //             generator.destinationPath('server/definitions.js'),
    //             {
    //                 api: generator.api
    //             }
    //         );
    //     }
    //     generator.fs.copy(
    //         generator.templatePath('server/users.js'),
    //         generator.destinationPath('server/users.js')
    //     );

    },

    end: function () {
        this.log(yosay(
            chalk.yellow('Did all the hard work, phew!\nGoodbye.')
        ));
    }
});