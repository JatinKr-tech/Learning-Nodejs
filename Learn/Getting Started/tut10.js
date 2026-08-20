//Node.js, the difference between development and production

//There is no difference between development and production in Node.js

//Node.js itself doesn't care whether you're testing on your laptop or running live on the internet. However, many popular third-party libraries (like Express, React, template engines, and loggers) check this variable:

//'node app.js' instead use 'NODE_ENV=production node app.js' while running on a live server

//A popular way of configuring your application is by using the twelve factor methodology.

//Why is NODE_ENV considered an antipattern?

//Don't do this, ex: 

if (process.env.NODE_ENV === 'development') {
  // ...
}
if (process.env.NODE_ENV === 'production') {
  // ...
}
if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}

//it makes the production and staging environments different, thus making reliable testing impossible.
//NODE_ENV to anything but production is considered an antipattern.

