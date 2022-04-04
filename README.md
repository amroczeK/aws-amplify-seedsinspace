### Project Summary
A small group of my Telstra colleagues and I volunteered for an amazing not-for-profit organisation called One Giant Leap Foundation. The foundation sent wattle seeds into space to be stored for several months, before being returned to earth for distribution across Australia. Here, they’ll be planted, measured and recorded in hundreds of schools and local organisations around the country.

The team worked together to design and develop a web application that provides organizations the capability to record, store, visualize and share seed growth data.

The web application is developed using ReactJS and Node.js, leveraging all the features of AWS Amplify, utilizing Cognito for Authentication, DynamoDB for data storage, Route53 for hosting, CodeCommit and CloudFormation for CI/CD.

GitHub: [Code repository](https://github.com/amroczeK/aws-amplify-seedsinspace)

Application: [Website](https://app.seedsinspace.com.au/)

Article: [LinkedIn article](https://www.linkedin.com/pulse/sending-seeds-space-volunteering-make-difference-justin-dolman/)


#### Architecture Overview

AWS Amplify is a set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS. With Amplify, you can configure app backends and connect your app in minutes, deploy static web apps in a few clicks, and easily manage app content outside the AWS console.

![seedsinspace-architecture.png](https://media.graphcms.com/m2QDJGdQiRXaCU5zppHA)

#### Services Breakdown

| Service      | Purpose |
| ----------- | ----------- |
| Amplify      | Instance where the React js website will be deployed and hosted       |
| Cognito   | Required for providing basic user authentication and login        |
| S3   | Storage instance which will be used for photos storage        |
| API Gateway   | Enable exposure of Lambda functions over http protocols        |
| Lambda   | Serverless component required to access the database        |
| DynamoDB   | NoSQL DB used to store the form data of the seeds        |
| CodeCommit   | GIT respository        |
| Route53   | Domain and DNS management        |
| IAM   | Identify and access management, security and roles        |
| CloudFormation   | Templates describing desired resources and their dependencies so we can launch and configure them together as a stack.        |
