// RETURNS: TITLE OF SITE
Template.registerHelper('siteTitle', function(string) {
  return SEO.settings.title;
});
// RETURNS: FIRST 140 CHARS OF STRING WITHOUT HTML/SCRIPT/PHP ELEMENTS
Template.registerHelper('summarize', function(string) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(140);
});
// RETURNS FORMATTED DATETIME WITH MOMENT LIBRARY
// - Moment Library: Parse, validate, manipulate, and display dates in JavaScript
Template.registerHelper('formatdate',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('MM/DD/YYYY');
  }else{
    return datetime;
  }
});
// Note: I change THE NAME OF THIS FUNCTION FROM 'formatdate' to 'formatdateaddsevendays' - duplicate name
Template.registerHelper('formatdateaddsevendays', function(datetime){
  if(moment && datetime){
    return moment(datetime).format("MM/DD/YYYY");
    var nextWeek = moment().add(7,'days');
  }else{
    return datetime;
  }
});
// RETURNS: STRING OF DATE FOR DISPLAY
Template.registerHelper('formatdatetime', function(datetime){
  if(moment && datetime){
    if(datetime.getDate() === new Date().getDate()){
      return "Today " + moment(datetime).format("hh:mm");
    }else{
      return moment(datetime).format("MM/DD/YYYY hh:mm");
    }
  }
  else {
    return datetime;
  }
});
// RETURNS: CONCATENATED STRING with '...'
Template.registerHelper('shorten', function(str,len){
  if(str && len){
    if(str.length > len && Session.get('shorten')){
      str = str.substring(0,len) + "...";
    }
  }
  return str;
});
Template.registerHelper('checkRole', function(userId,rolename){
  var authorized = false;
  if (Roles.userIsInRole(userId, [rolename]) || Roles.userIsInRole(userId,['admin'])){
    authorized = true;
  }
  return authorized;
});
Template.registerHelper('formatfilesize', function(str,len){
  str = (Number(str)/1000000).toFixed(2) + "MB";
  return str;
});
Template.registerHelper('formatphone', function(str){
  if(str && str.length > 9){
    str = "(" + str.substring(0,3) + ")" + str.substring(3,6) + "-" + str.substring(6,13);
  }
  return str;
});
Template.registerHelper('isAdmin', function(){
  if(Meteor.user() && Meteor.user().profile)
    var role = Meteor.user().profile.role;
    return role === 'admin';
});
Template.registerHelper('pad',function(number,digits){
  return String("00000000" + number).slice(-(digits+1));
});
Template.registerHelper('camel',function(str){
  return str.replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
});
