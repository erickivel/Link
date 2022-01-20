## ormconfig.json
- Edit "dist" to "src"
- "js" to "ts"
---
## Database Error Code 503
- Set on Heroku Config Environmental Variables: PGSSLMODE = no-verify
---
## On GraphQL Playground
</br>

http://localhost:4000/graphql
</br></br>

### *Example mutation:*

mutation {</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;register(</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;about: "My about"</br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username: "Eric",</br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: "mypassword"</br>
  ) {</br>
  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;about </br>
   	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username </br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} </br>
}
</br>
</br>

### *Example query:*

query {</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;users {</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;about</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</br>
}