# <%= app.name %> #

<%= app.description %>

## Building & Running ##

To build run the following command which will build a clean distribution in the `dist` folder

``` sh
webpack
```
or via NPM using
```sh
npm run build
```

For development 

1. Create a `.env` file with the value of API_HOST to point to a host that is serving the API's
   ```sh
   API_HOST=ec2-18-219-25-51.us-east-2.compute.amazonaws.com
   ```
2. Update `wbepack.config.js` to update the ports and url prefixes for proxying from the remote API host
   ```json
   {
     //...
     proxy: {
       "/node": {
         target: `http://${apiHost}/cmp/v1/`,
         pathRewrite: { "^/node": "" },
         agent: proxyAgent
       },
       "/java": {
         target: `http://${apiHost}/cmp/v2/`,
         pathRewrite: { "^/java": "" },
         agent: proxyAgent
       }
     }
   }
   ```
3. Run the dev server
   ```sh
   webpack-dev-server
   ```
   or 
   ```sh
   npm run start
   ```
4. Visit `http://localhost:4200`
