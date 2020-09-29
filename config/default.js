module.exports = {
  Redis: {
    mode: "instance", //instance, cluster, sentinel
    ip: "",
    port: 6379,
    user: "",
    password: "",
    sentinels: {
      hosts: "SENTNELS_URL",
      port: 6379,
      name: "redis-cluster"
    }
  },
  Security: {
    mode: "instance", //instance, cluster, sentinel
    ip: "",
    port: 6379,
    user: "",
    password: "",
    sentinels: {
      hosts: "SENTNELS_URL",
      port: 6379,
      name: "redis-cluster"
    }
  },
  Host: {
    profilesearch: "secondary",
    vdomain: "localhost",
    domain: "localhost",
    port: "3638",
    version: "1.0.0.0"
  },
  RabbitMQ: {
    ip: "",
    port: 5672,
    user: "duo",
    password: "",
    vhost: "/"
  },
  Mongo: {
    ip: "",
    port: "",
    dbname: "dvpdb",
    password: "",
    user: "facetone",
    type: "mongodb"
  },
  LBServer: {
    ip: "LB_FRONTEND",
    port: "LB_PORT"
  }
};
