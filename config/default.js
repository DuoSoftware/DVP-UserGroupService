module.exports = {
  Security: {
    "mode":"instance",//instance, cluster, sentinel
    "ip": "url",
    "port": 6379,
    "user": "User",
    "password": "Password",
    "sentinels":{
      "hosts": "url",
      "port":16389,
      "name":"redis-cluster"
    }
  },
  Host: {
    "profilesearch":"secondary",
    "resource": "cluster",
    "vdomain": "localhost",
    "domain": "localhost",
    "port": "3638",
    "version": "1.0.0.0"
  },
  Mongo: {
    "ip":"url",
    "port":"27017",
    "dbname":"dvpdb",
    "password":"Password",
    "user":"User",
    "replicaset" :""
  },
  LBServer: {
    ip: "LB_FRONTEND",
    port: "LB_PORT"
  }
};
