const AccessControl = require('accesscontrol');
const db = require('../db');
// grant list fetched from DB (to be converted to a valid grants object, internally)
/* let grantList = [
    { role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
    { role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
    { role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },
  
    { role: 'user', resource: 'video', action: 'create:own', attributes: '*, !rating, !views' },
    { role: 'user', resource: 'video', action: 'read:any', attributes: '*' },
    { role: 'user', resource: 'video', action: 'update:own', attributes: '*, !rating, !views' },
    { role: 'user', resource: 'video', action: 'delete:own', attributes: '*' }
  ];
 */  
  // const text =
  //   `SELECT public.user_role.name as role,permission.action as action, permission.resource as resource
  //   FROM role_permission rp
  //   INNER JOIN user_role
  //   ON rp.roleid = user_role.id
  //   INNER JOIN permission
  //   ON rp.permissionid = permission.id
  //   ORDER BY name;`;
  
  // db.query(text).then(res => {
  //   let grantList = res.rows;
  //   console.log(grantList);
  // })
  // .catch(e => console.error(e.stack));
  

  const ac = new AccessControl();
  
    
  ac.grant('guest')
      .readAny(['post', 'thread', 'forum'])
      .createOwn('account')
    .grant('user')
      .extend('guest')
      .createOwn(['post', 'thread'])
      //.readOwn(['account', 'post', 'thread'])
      .readOwn(['account', 'post', 'thread'])
      .updateOwn(['account', 'post', 'thread'])
      .deleteOwn(['account', 'post', 'thread'])
/*     .grant(['moderator'])
      .createOwn(['post', 'thread'])
      .readOwn(['post', 'thread'])
      .updateAny(['post', 'thread'])
      .deleteAny(['post', 'thread'])
    .grant('admin')
      .createAny(['forum', 'thread', 'post'])
      .readAny(['forum', 'thread', 'post'])
      .updateAny(['forum', 'thread', 'post'])
      .deleteAny(['forum', 'thread', 'post']) */

  // const permission = ac.can('guest').readAny('post');
  // console.log(permission.granted);
  // console.log(permission.attributes);
  module.exports = {
    rideHubAC: ac
   };
   
