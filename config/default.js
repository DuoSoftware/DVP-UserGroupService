module.exports = {
  Redis: {
    "mode":"instance",//instance, cluster, sentinel
    "ip": "ec2-18-189-192-150.us-east-2.compute.amazonaws.com",
    "port": 6379,
    "user": "duo",
    "password": "DuoS123",
    "sentinels":{
      "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
      "port":16389,
      "name":"redis-cluster"
    }
  },
  Security: {
    "mode":"instance",//instance, cluster, sentinel
    "ip": "ec2-18-189-192-150.us-east-2.compute.amazonaws.com",
    "port": 6379,
    "user": "duo",
    "password": "DuoS123",
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
    "ip": "ec2-18-189-192-150.us-east-2.compute.amazonaws.com",
    "port": 5672,
    "user": "duo",
    "password": "DuoS123",
    "vhost":'/'
  },
  Mongo: {
    "ip":"ec2-18-189-192-150.us-east-2.compute.amazonaws.com",
    "port":"27017",
    "dbname":"dvpdb",
    "password":"DuoS123",
    "user":"duo",
    "replicaset" :""
  },
  LBServer: {
    ip: "LB_FRONTEND",
    port: "LB_PORT"
  }
};