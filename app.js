var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var session = require('express-session');
var cors = require('cors');
var app = express();

var logger = require('dvp-common-lite/LogHandler/CommonLogHandler.js').logger;
var userGroupService = require("./UserGroupService");
var config = require('config');
var jwt = require('restify-jwt');
var secret = require('dvp-common-lite/Authentication/Secret.js');
var authorization = require('dvp-common-lite/Authentication/Authorization.js');

var mongomodels = require('dvp-mongomodels');
var healthcheck = require('dvp-healthcheck/DBHealthChecker');

var port = config.Host.port || 3000;
var host = config.Host.vdomain || 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(errorhandler({ dumpExceptions: true, showStack: true }));
app.use(cors());

var hc = new healthcheck(app, {mongo: mongomodels.connection});
hc.Initiate();

app.post('/DVP/API/:version/UserGroup',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"write"}), userGroupService.CreateUserGroup);
app.get('/DVP/API/:version/UserGroups',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"read"}), userGroupService.GetGroupsAndUsers);
app.get('/DVP/API/:version/ConsolidatedUserGroups/:consolidated',jwt({secret: secret.Secret}), authorization({resource:"consolidatedreports", action:"read"}), userGroupService.GetGroupsAndUsers);
app.get('/DVP/API/:version/UserGroup/:id',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"read"}), userGroupService.GetUserGroup);
app.get('/DVP/API/:version/UserGroup/:id/members',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"read"}), userGroupService.GetGroupMembers);
app.get('/DVP/API/:version/UserGroupByName/:name',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"read"}), userGroupService.GetUserGroupByName);
app.delete('/DVP/API/:version/UserGroup/:id',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"delete"}), userGroupService.DeleteUserGroup);
app.put('/DVP/API/:version/UserGroup/:id',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"write"}), userGroupService.UpdateUserGroup);
app.put('/DVP/API/:version/UserGroup/:id/User/:user',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"write"}), userGroupService.UpdateUserGroupMembers);
app.delete('/DVP/API/:version/UserGroup/:id/User/:user',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"delete"}), userGroupService.RemoveUserGroupMembers);
app.post('/DVP/API/:version/UserGroup/User/:user',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"get"}), userGroupService.FindUserGroupsByMember);

app.put('/DVP/API/:version/UserGroup/:id/Supervisor/:user',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"write"}), userGroupService.UpdateUserGroupSupervisors);
app.get('/DVP/API/:version/UserGroup/:id/Supervisors',jwt({secret: secret.Secret}), authorization({resource:"userGroup", action:"write"}), userGroupService.GetUserGroupSupervisors);

app.get('/DVP/API/:version/Supervisor/:sid/Groups', jwt({secret: secret.Secret}),authorization({resource:"userGroup", action:"read"}), userGroupService.GetSupervisorUserGroups);
app.listen(port, function () {
    logger.info("DVP-UserGroupService.main Server listening at %d", port);
});

