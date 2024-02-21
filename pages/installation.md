# Installation

This guide will walk you through the process of setting up the Circuit Parts project on your local machine. It's going to be a little bit of work to signup for few services and setup the environmental variable but it's going to be worth it!

Get yourself a cup of coffee ☕️ and let's get started!

## System Requirements

Here is what you need to be able to run Circuit Parts

-   [Node.js 18.17](https://nodejs.org/) or later.
-   [npm](https://docs.npmjs.com/) (recommended)
-   macOS, Windows (including [WSL](https://learn.microsoft.com/en-us/windows/wsl/)), and Linux are supported.
-   Code Editor ([VSCode](https://code.visualstudio.com/) recommended)

## Project Setup

Follow these steps to set up the project on your local machine:

### Forking Repository

1. Navigate to the [Circuit Parts GitHub repository](https://github.com/circuitparts/store) and click the "Fork" button in the top right corner of the page. This will create a copy of the repository in your GitHub account. See [Forking a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) for more information.

    ![alt text](https://docs.github.com/assets/cb-40742/mw-1440/images/help/repository/fork-button.webp)

### Cloning Repository

2. [Clone](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository) the repository to your local machine by running the following command in your terminal. This will create a copy of the repository on your local machine.

```bash
git clone https://github.com/circuitparts/store.git
```

### Install Dependencies

3. Navigate to the project folder and install the required dependencies by running the following command in your terminal.

```bash
cd store
npm install
```

### Environment Variables

4. Setup your environment variables by copying the `.env.example` file to `.env.local` and replace the placeholders with the applicable keys. For database and storage setup, see the next sections.

```bash
cp .env.example .env.local
```

### Database Setup

5. This project uses [MongoDB](https://mongodb.com) for storing data.
    1. Start at the [MongoDB Atlas registration page](https://account.mongodb.com/account/register) to register for a new Atlas account. Alternatively, you can log in if you already have an account.
    2. If you are registering for a new account, Atlas creates an organization and project for you. You can also create them on your own.
    3. With your organization and project created, you can now [deploy a free cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/) that will be used to store your data.
    4. Go to the overview page for your project. Click the **Create** button to create a new cluster.
    5. Select the M0 option. This is the free tier and will be sufficient for working with this project.
    6. Choose a cloud provider and region for your cluster. The default options are fine for this project.
    7. Click the **Create** button at the bottom of the page to deploy the cluster and The **Security Quickstart** wizard appears.
    8. Create a **database user** by specifying a **username** and **password**. Make sure to save the username and password as you will need them later.
    9. MongoDB will automatically add your IP address to the **IP Access List**. Alternatively, you can add **0.0.0.0/0** to the list to allow access from any IP address. **This is not recommended for production environments.**
    10. Click the **Finish and Close** button to complete the setup.
    11. In the overview page, click the **Connect** button to connect to your cluster. Select any method and copy the connection string. Your connection string should look something like this:
        `mongodb+srv://<project_name>:<password>@<cluster_name>.<xxxx>.mongodb.net/?retryWrites=true&w=majority`
    12. Replace `<password>` with the password for the user you created earlier and add it to your `.env.local` file.

### AWS S3 Storage Setup

6. This project uses AWS S3 for storing design files uploaded by users from the PCB Fabrication Order page:

    1. Signup for [AWS](https://portal.aws.amazon.com/billing/signup) and follow on-screen instructions to create an account. When you sign up for an AWS account, an AWS account root user is created. The root user has access to all AWS services and resources in the account.
    2. **(Optinal Setup)** Secure your AWS root user by turning on multi-factor authentication (MFA). See [Enabling a virtual MFA device](https://docs.aws.amazon.com/IAM/latest/UserGuide/enable-virt-mfa-for-root.html) for more information. As a security best practice, assign [administrative access](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html) to an administrative user, and use only the root user to perform tasks that require [root user access](https://docs.aws.amazon.com/accounts/latest/reference/root-user-tasks.html)
    3. Open the Amazon S3 console at [https://console.aws.amazon.com/s3/](https://console.aws.amazon.com/s3/).
    4. Click the **Create bucket** button to open the Create bucket wizard.
    5. For **Region**, choose the AWS Region where you want the bucket to reside. Ideally choose a region that is closest to you to reduce latency.
    6. In the **Bucket name** field, enter a unique name for your bucket. The bucket name must be unique across all existing bucket names in Amazon S3. If you receive an error, try a different bucket name.
    7. The default settings should be for this project. Just make sure under Object Ownership, **ACLs disabled (recommended)** is **enabled** and under Block Public Access settings for this bucket, **Block \***all**\* public access** is **enabled**.
    8. Click **Create bucket** to create your bucket.
    9. Click on the bucket you just created and navigate to the **Permissions** tab. Click on **Cross-origin resource sharing (CORS)** and add the following policy in the editor:

        ```json
        [
        	{
        		"AllowedHeaders": ["*"],
        		"AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
        		"AllowedOrigins": [
        			"http://localhost:3000",
        			"http://localhost:3000/*",
        			"<optinally_add_your_own_domain_here>"
        		],
        		"ExposeHeaders": []
        	}
        ]
        ```

    10. Click **Save** to save the policy.
    11. Go to **Properties** tab and in **Bucket overview** section, copy the **Bucket ARN**. You will need this to create a policy for the IAM user.
    12. Copy the **Bucket ARN** and **Region** and add it to your `.env.local` file.
    13. Create a new **IAM user**. On the search bar type **IAM** and click on the **IAM** service. Click on **Users** from the left sidebar and click on **Create user**.
    14. Enter a **username** and click **Next**
    15. Click on **Attach existing policies directly** and click on **Create policy** to open a new window. Click on the **JSON** tab and add the following policy:

        ```json
        {
        	"Version": "2012-10-17",
        	"Statement": [
        		{
        			"Sid": "Statement1",
        			"Effect": "Allow",
        			"Action": ["s3:ListBucket", "s3:DeleteObject", "s3:GetObject", "s3:PutObject"],
        			"Resource": ["<your_bucket_arn>"]
        		}
        	]
        }
        ```

        Replace `<your_bucket_arn>` with the **Bucket ARN** you copied earlier.

    16. Click **Review policy** and give your policy a name and description. Click **Create policy** to create the policy.
    17. Go back to the previous window and under **Permissions polices** section click **Refresh** icon. Search for the policy you just created and select it. Click **Next** and then **Create user**.
    18. Review the user details and click **Create user**.
    19. In the users list, click on the user you just created and navigate to the **Security credentials** tab. Click on **Create access key** and save the **Access key ID** and **Secret access key**. Add these keys to your `.env.local` file.
    20. Copy the **User ARN** from the summary tab. You will need this to add it to the bucket policy.
    21. Go back to the **Permissions** tab of your bucket and click on **Bucket policy**. Add the following policy in the editor:

        ```json
        {
        	"Version": "2012-10-17",
        	"Statement": [
        		{
        			"Sid": "Statement1",
        			"Effect": "Allow",
        			"Principal": {
        				"AWS": ["<your_user_arn>"]
        			},
        			"Action": ["s3:ListBucket", "s3:DeleteObject", "s3:GetObject", "s3:PutObject"],
        			"Resource": ["<your_bucket_arn>", "<your_bucket_arn>/*"]
        		}
        	]
        }
        ```

        Replace `<your_user_arn>` with the **User ARN** you copied earlier and `<your_bucket_arn>` with the **Bucket ARN** you copied earlier. Take a close look at the **Resource** field. It should have the bucket ARN and the bucket ARN with **`/*`** at the end.

    22. Click **Save** to save the policy.
    23. You have successfully setup your S3 bucket. Add the **Access key ID**, **Secret access key**, **Bucket name**, **Region** and **Bucket ARN** to your `.env.local` file.

    Uff! That was a lot of work but you did it! Congratulations 🎉

### Building

7. Build the project by running the following command in your terminal. This will create a development build of the project and start the development server.

```bash
npm run build
```

8.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

    ![circuit parts](../public/images/screenshots/localhost.png)

    You should see the Circuit Parts homepage. If you see this, congratulations! You have successfully setup the project on your local machine.

    If you see any errors, please refer to the [Troubleshooting](#troubleshooting) section.

## VS Code

In progress. Will be updated soon.

## Troubleshooting

In progress. Will be updated soon.
