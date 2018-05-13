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
                    api.definitions[definition]['baseName'] = modelName;

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

        try {
            fs.mkdirSync(basePath + 'front-end/');
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(basePath + 'front-end/') + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(basePath + 'front-end/') + ') already exists');
            log(err);
        }
        try {
            fs.mkdirSync(basePath + 'front-end/src/');
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(basePath + 'front-end/src/') + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(basePath + 'front-end/src/') + ') already exists');
            log(err);
        }

        var angularPath = basePath + 'front-end/src/' + angularModule + '/';
        try {
            fs.mkdirSync(angularPath);
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath) + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath) + ') already exists');
            log(err);
        }

        try {
            fs.mkdirSync(angularPath + 'entities/');
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + 'entities/') + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + 'entities/') + ') already exists');
            log(err);
        }


        var angularInterface = 'entities/interface/';
        var angularModels    = 'entities/models/';
        try {
            fs.mkdirSync(angularPath + angularInterface);
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + angularInterface) + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + angularInterface) + ') already exists');
            log(err);
        }

        try {
            fs.mkdirSync(angularPath + angularModels);
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + angularModels) + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + angularModels) + ') already exists');
            log(err);
        }


        var angularComponents= 'components/';
        try {
            fs.mkdirSync(angularPath + 'components/');
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + 'components/') + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + 'components/') + ') already exists');
            log(err);
        }


        var angularMensager  = 'menssager/';
        try {
            fs.mkdirSync(angularPath + 'menssager/');
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + 'menssager/') + ') created');
        } catch (err) {
            log(chalk.red('(EE) ') + chalk.red('[ Angular  ]') + '  Folder (' + chalk.yellow(angularPath + 'menssager/') + ') already exists');
            log(err);
        }

        // Generating models
        for (var definition in generator.api.definitions) {
            var interfacePath = angularPath + angularInterface + generator.api.definitions[definition]['modelName'].replace('.model.', '.interface.');
            var modelPath = angularPath + angularModels + generator.api.definitions[definition]['modelName'];

            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Creating interface: ' + chalk.yellow(interfacePath) + '');
            generator.fs.copyTpl(
                generator.templatePath('angular/interface.js'),
                generator.destinationPath(interfacePath),
                {
                    interfacename: 'I' + generator.api.definitions[definition]['baseName'],
                    author: generator.api.info.contact.name,
                    email: generator.api.info.contact.email,
                    attributes: generator.api.definitions[definition]['attributes'],
                    api: generator.api
                }
            );

            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Creating model:     ' + chalk.yellow(modelPath) + '');
            generator.fs.copyTpl(
                generator.templatePath('angular/model.js'),
                generator.destinationPath(modelPath),
                {
                  classname: generator.api.definitions[definition]['baseName'],
                  author: generator.api.info.contact.name,
                  email: generator.api.info.contact.email,
                  attributes: generator.api.definitions[definition]['attributes'],
                  api: generator.api
                }
            );
        }

        // Generating components
        for (var component in generator.api.components) {
            var componentName = (component.replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, ""))
            var componentPath = angularPath + angularComponents + componentName + '.component.ts'
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '  Creating Component: ' + chalk.yellow( componentPath ) );
            // generator.fs.copyTpl(
            //     generator.templatePath('angular/smart-component.js'),
            //     generator.destinationPath(componentPath),
            //     {
            //       component: component,
            //       author: generator.api.info.contact.name,
            //       email: generator.api.info.contact.email,
            //       api: generator.api
            //     }
            // );

            var listComponentPath = angularPath + angularComponents + componentName + '-list.component.ts';
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '     Creating Dumb Component: ' + chalk.yellow(listComponentPath));
            generator.fs.copyTpl(
                generator.templatePath('angular/list-component.js'),
                generator.destinationPath(listComponentPath),
                {
                  component: component,
                  author: generator.api.info.contact.name,
                  email: generator.api.info.contact.email,
                  api: generator.api
                }
            );

            var editComponentPath = angularPath + angularComponents + componentName + '-edit.component.ts';
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '     Creating Dumb Component: ' + chalk.yellow(editComponentPath));
            generator.fs.copyTpl(
                generator.templatePath('angular/edit-component.js'),
                generator.destinationPath(editComponentPath),
                {
                  component: component + 'EditComponent',
                  author: generator.api.info.contact.name,
                  email: generator.api.info.contact.email,
                  api: generator.api
                }
            );

            var viewComponentPath = angularPath + angularComponents + componentName + '-view.component.ts';
            log(chalk.blue('(II) ') + chalk.red('[ Angular  ]') + '     Creating Dumb Component: ' + chalk.yellow(viewComponentPath));
            generator.fs.copyTpl(
                generator.templatePath('angular/smart-component.js'),
                generator.destinationPath(viewComponentPath),
                {
                  component: component + 'ViewComponent',
                  author: generator.api.info.contact.name,
                  email: generator.api.info.contact.email,
                  api: generator.api
                }
            );
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
