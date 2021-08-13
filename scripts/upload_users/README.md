# Upload Users to AWS Cognito

![Build Status](https://img.shields.io/badge/python-3-yellow.svg)

This script is used to bulk upload users to the Seeds in Space user pool in AWS Cognito.

## Setup

If you haven't already done so, you will need to set up access to the AWS Tenancy. If Amplify has not already done this for you, you can do this using the AWS CLI.

### AWS Requirements

- AWS Access Key ID
- AWS Secret Access Key

```
aws configure
```

NOTE: You may need to export certain AWS CLI specific environment variables to ensure boto3 uses the right settings to connect to the Tenancy

```
AWS_PROFILE=seedinspace
AWS_DEFAULT_REGION=ap-southeast-2
AWS_DEFAULT_OUTPUT=json
```

### Python Requirements

The following Python packages will need to be installed before

- pandas
- boto3

These can be installed using pip

```
pip3 install requirements.txt
```

### Other Requirements

Before running the script, please ensure that the following has been done

- `data.csv` file exists and contains valid data. The only data you need is a set of emails to create user accounts for.
- The user pool id has been populated in the `upload_users.py` script

## Usage

Running the script can be done as given below

```
python3 ./upload_users.py
```

## Authors

- Taruka Liyanagamage
