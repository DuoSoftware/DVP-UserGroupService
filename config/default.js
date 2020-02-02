module.exports = {
  Redis: {
    "mode":"instance",//instance, cluster, sentinel
    "ip": "url",
    "port": 6379,
    "user": "user",
    "password": "Password",
    "sentinels":{
      "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
      "port":16389,
      "name":"redis-cluster"
    }
  },
  Security: {
    "mode":"instance",//instance, cluster, sentinel
    "ip": "url",
    "port": 6379,
    "user": "user",
    "password": "Password",
    "sentinels":{
      "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
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
  RabbitMQ: {
    "ip": "url",
    "port": 5672,
    "user": "user",
    "password": "Password",
    "vhost":'/'
  },
  Mongo: {
    "ip":"url",
    "port":"27017",
    "dbname":"dvpdb",
    "password":"Password",
    "user":"user",
    "replicaset" :""
  },
  LBServer: {
    ip: "LB_FRONTEND",
    port: "LB_PORT"
  }
};