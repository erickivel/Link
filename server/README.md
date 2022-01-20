# ormconfig.json

- Edit "dist" to "src" and "js" to "ts"

# On GraphQL Playground
## http://localhost:4000/graphql

## Example mutation
mutation {</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;register(</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;about: "My about"</br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username: "Eric",</br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: "mypassword"</br>
  ) {</br>
  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;about </br>
   	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username </br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} </br>
}</br>