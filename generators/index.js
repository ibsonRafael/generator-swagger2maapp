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

                var tags = [];
                for (var path in api.paths) {
                    for(var method in api.paths[path]) {
                        // console.log("\t" + method + " tag:" + api.paths[path][method].tags[0]);
                        if(tags.indexOf(api.paths[path][method].tags[0]) == -1) {
                            tags.push(api.paths[path][method].tags[0]);
                        }
                    }
                }
                console.log(tags);
                //log('\t%s sub-contexts candidates found...', tags.length);

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
                console.log(api.definitions);


                generator._tags = tags;

                //Generate files...
                for (var definition in api.definitions) {
                    console.log('Creating ' + api.definitions[definition]['modelName'] + '...');
                }

                for (var component in api.components) {
                    var componentName = (component.replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, ""))
                    componentName = componentName + '.component.ts';
                    console.log('Creating ' + componentName + '...');
                }

                //git remote add origin https://github.com/user/repo.git
                git remote -v


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

        try {
            // Make spec folder
            fs.mkdirSync('spec');
        } catch (err) {
            log('Folder already exists');
        }

        swaggerFileStream = fs.createWriteStream(swaggerFilePath);
        // Parsing URL
        var url = new URL(swaggerURL);
        // Coping original spec from URL
        if (url.protocol === 'https:') {
            sync(https.get(swaggerURL).pipe(swaggerFileStream));
        } else if (url.protocol === 'http:') {
            sync(http.get(swaggerURL).pipe(swaggerFileStream));
        } else {
            // @TODO Add possibility to use a local file using or the path testing if files exists file://
            log('Please provide proper URL (http/https).');
        }

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