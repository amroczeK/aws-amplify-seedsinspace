import pandas as pd
import boto3

POOL_ID = "<POPULATE_THIS_WITH_COGNITO_POOL_ID>"


def main():
    client = boto3.client("cognito-idp")

    df = pd.read_csv("data.csv")

    for school in df.itertuples():

        _ = client.admin_create_user(
            UserPoolId=POOL_ID,
            Username=school.email,
            UserAttributes=[
                {"Name": "email", "Value": school.email},
                {"Name": "email_verified", "Value": "True"},
            ],
            ForceAliasCreation=True,
            DesiredDeliveryMediums=[
                "EMAIL",
            ],
        )

        print(f"Created User for School {school.email}")


if __name__ == "__main__":
    main()
