## Requirements

* Node 8
* Git
* Contentful CLI (only for write access)

Without any changes, this app is connected to a Contentful space with read-only access. To experience the full end-to-end Contentful experience, you need to connect the app to a Contentful space with read _and_ write access. This enables you to see how content editing in the Contentful web app works and how content changes propagate to this app.

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
node app.js
```

## Routes
* [http://localhost:3000/api/v1/register/](http://localhost:3000/api/v1/register/) Use ***POST*** method and give it the required data:
> fullName

>  email

> password

> phoneNumber

> city

* [http://localhost:3000/api/v1/login/](http://localhost:3000/api/v1/login/) Use ***POST*** method and give it the required data:
>  email

> password
