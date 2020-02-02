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


























/*


 var server = restify.createServer({
 name: "DVP User Service"
 });

 server.pre(restify.pre.userAgentConnection());
 server.use(restify.bodyParser({ mapParams: false }));
 restify.CORS.ALLOW_HEADERS.push('authorization');
 server.use(restify.CORS());
 server.use(restify.fullResponse());
 server.use(jwt({secret: secret.Secret}));


 //////////////////////////////Cloud API/////////////////////////////////////////////////////

 server.get('/DVP/API/:version/Users', authorization({resource:"user", action:"read"}), userService.GetUsers);
 server.get('/DVP/API/:version/User/:name', authorization({resource:"user", action:"read"}), userService.GetUser);
 server.del('/DVP/API/:version/User/:name', authorization({resource:"user", action:"delete"}), userService.DeleteUser);
 server.post('/DVP/API/:version/User', authorization({resource:"user", action:"write"}), userService.CreateUser);
 server.put('/DVP/API/:version/User/:name', authorization({resource:"user", action:"write"}), userService.UpdateUser);

 //////////////////////////////Organisation API/////////////////////////////////////////////////////
 server.get('/DVP/API/:version/User/:name/profile', authorization({resource:"userProfile", action:"read"}), userService.GetUserProfile);
 server.put('/DVP/API/:version/User/:name/profile', authorization({resource:"userProfile", action:"write"}), userService.UpdateUserProfile);

 server.get('/DVP/API/:version/Organisations', authorization({resource:"user", action:"read"}), organisationService.GetOrganisations);
 server.get('/DVP/API/:version/Organisation', authorization({resource:"user", action:"read"}), organisationService.GetOrganisation);
 server.del('/DVP/API/:version/Organisation', authorization({resource:"user", action:"delete"}), organisationService.DeleteOrganisation);
 server.post('/DVP/API/:version/Organisation', authorization({resource:"user", action:"write"}), organisationService.CreateOrganisation);
 server.patch('/DVP/API/:version/Organisation', authorization({resource:"user", action:"write"}), organisationService.UpdateOrganisation);

 server.get('/DVP/API/:version/Users/:name/Scope', authorization({resource:"userScope", action:"write"}), userService.GetUserScopes);
 server.put('/DVP/API/:version/Users/:name/Scope', authorization({resource:"userScope", action:"write"}), userService.AddUserScopes);
 server.del('/DVP/API/:version/User/:name/Scope/:scope', authorization({resource:"userScope", action:"delete"}), userService.DeleteUser);

 server.get('/DVP/API/:version/Users/:name/Scope', authorization({resource:"userAppScope", action:"write"}), userService.GetAppScopes);
 server.put('/DVP/API/:version/Users/:name/AppScope', authorization({resource:"userAppScope", action:"write"}), userService.AddUserAppScopes);
 server.del('/DVP/API/:version/User/:name/AppScope/:scope', authorization({resource:"userAppScope", action:"delete"}), userService.RemoveUserAppScopes);


 server.get('/DVP/API/:version/Users/:name/UserMeta', authorization({resource:"userMeta", action:"read"}), userService.GetUserMeta);
 server.put('/DVP/API/:version/Users/:name/UserMeta', authorization({resource:"userMeta", action:"write"}), userService.UpdateUserMetadata);

 server.get('/DVP/API/:version/Users/:name/AppMeta', authorization({resource:"userAppMeta", action:"read"}), userService.GetAppMeta);
 server.put('/DVP/API/:version/Users/:name/AppMeta', authorization({resource:"userAppMeta", action:"write"}), userService.UpdateAppMetadata);




 server.listen(port, function () {

 logger.info("DVP-UserService.main Server %s listening at %s", server.name, server.url);

 });

 */
