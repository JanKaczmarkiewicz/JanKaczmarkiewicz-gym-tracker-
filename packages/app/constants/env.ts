const ENV = {
  development: {
    API_URL: "http://192.168.1.8:3000",
  },
  production: {
    API_URL: "http://gym-tracker-backend.herokuapp.com",
  },
};

const env = __DEV__ ? ENV.development : ENV.production;

export default env;
