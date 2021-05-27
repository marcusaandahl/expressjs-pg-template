# food-app

## What is this template?

This template is for [ExpressJS](https://expressjs.com/) used with [PostgreSQL](https://www.postgresql.org/). It also has [jQuery](https://jquery.com/) available for use, along with [Bootstrap 5](https://getbootstrap.com/).
New commands to ease database use is also set up, along with a _USERS_ example. The way the database is use is through MODEL objects, such as [Ruby on Rails](https://rubyonrails.org/) does.
Down below is a guide to set it up, along with documentation:
* [How to set it up](https://github.com/marcusaandahl/expressjs-pg-template#how-to-set-it-up)
* [Documentaion](https://github.com/marcusaandahl/expressjs-pg-template#Documentation)

## How to set it up

### GET THE FILES IN CHECK

Let's set up the repository locally on your computer first.

1. The first step is to **_fork_** this repository, so it is available to use as a template for your own projects.
2. Then, it is time to create a repository on github for your new project. Under the field to _input project name_ should be the option **No template**, which, after pressed, should give you the _expressjs-pg-template_ option. **Select it**
3. The repository is now ready to be used! Head to your terminal, which should be in the **folder in which your project will be**
4. Then, do the usual git commands:
   * `git init`
   * `git remote add YOUR-GIT-REPO-LINK`
   * `git pull origin main`
5. **BIM BAM BOUM**, your repository is now set up with the template, but it isn't quite ready to be used yet


### SET UP .ENV AND CO.

Time for setting up your global variables, so your app doesn't simply run as _template-app_

1. Start with _.env\*sample_, and change it to _.env_, then change the following accordingly:
   - Change `ln1: APP_NAME=YOUR_APP_NAME` to match what you want your app to be called (mainly for debugging, **use _-_ instead of spaces**)
   - (Optional) Change `ln3: PORT=YOUR_PORT` to whatever port you want your app to run on, 3000 is default, but the option to change is there
   - (Optional) Change `ln5: DB_ADAPTER=postgresql` to the database adapter you use (ex. postgresql, mysql) (**template only works with PGSQL as of now**)
   - Change `ln7: PGHOST="localhost"` to where you are hosting your app/server, localhost by default when running locally
   - Change `ln8: PGDATABASE="YOUR_DB_NAME"` to the name of the main database you've locally created for this app
   - Change `ln9: PGUSER="YOUR_DB_USERNAME"` to the user in your database. Make sure that user has OWNER access to your main database
   - Change `ln10: PGPASSWORD=YOUR_DB_USER_PASSWORD` to the password of your user in the database
   - Chagen `ln11: PGPORT=YOUR_DB_PORT` to the port your database uses, by defauly 5432 for postgresql
2. Go to `package.json` and change the following:
   - Change `ln2: "name": "template-app",` to match your app name
   - Change `ln 5-13: "scripts" : "start -> seedDB": "DEBUG=\*-app:\*"` so that the `\*-app` bit matches your app name (will be used for debugging)
   - Change `ln29: "repository": "git@github.com:marcusaandahl/expressjs-pg-template.git",` to your own repository HTML or SSH link
   - Change `ln30: "author": "Marcus Andreas Aandahl <marcus.aandahl@gmail.com>",` to your own author credentials


### RUN LAST FILES

1. Last step is simply to run `yarn install --check-files` in your terminal, and it should all be up and running accordingly



## Documentation

uses GMT for database timestamps

yarn newMigr migration_name (no special characters)
use in schema

yarn migrDB does migrations in schema

yarn newMod MODEL new models must be singular fx. yarn newMod User, and not Users

yarn seedDB runs seeding 
